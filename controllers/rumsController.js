import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveData = (data) => {
  writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Funkcja pomocnicza do zamiany id nagród na pełne obiekty
const mapAwards = (awardIds, awardsList) => {
  return awardIds.map(id => awardsList.find(award => award.id === id));
};

const getAllRum = (req, res) => {
  const data = loadData();
  const rum = data.rum;
  const awardsList = data.awards;


  const response = rum.map(r => ({
    ...r,
    details: {
      ...r.details,
      awards: {
        international: mapAwards(r.details.awards.international, awardsList),
        domestic: mapAwards(r.details.awards.domestic, awardsList)
      }
    }
  }));

  res.json(response);
};

const createRum = (req, res) => {
  const data = loadData();
  const rum = data.rum;
  const newRum = req.body;

  if (!newRum.name || !newRum.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = rum.find(r => r.name === newRum.name);
  if (exists) {
    return res.status(409).json({ error: "Rum już istnieje" });
  }

  newRum.id = rum.length > 0 ? rum[rum.length - 1].id + 1 : 1;
  rum.push(newRum);
  saveData({ ...data, rum });

  res.status(201).location(`/api/rum/${newRum.id}`).json(newRum);
};

const getRumById = (req, res) => {
  const data = loadData();
  const awardsList = data.awards;
  const singleRum = data.rum.find(r => r.id === parseInt(req.params.id));

  if (!singleRum) {
    return res.status(404).json({ error: 'Rum nie znaleziony' });
  }

  // Zamień id nagród na pełne obiekty nagród
  singleRum.details.awards = {
    international: mapAwards(singleRum.details.awards.international, awardsList),
    domestic: mapAwards(singleRum.details.awards.domestic, awardsList)
  };

  // Dodaj HATEOAS
  const response = {
    ...singleRum,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/rums/${singleRum.id}` },
      update: { href: `${req.protocol}://${req.get('host')}/api/rums/${singleRum.id}` },
      delete: { href: `${req.protocol}://${req.get('host')}/api/rums/${singleRum.id}` },
      allRums: { href: `${req.protocol}://${req.get('host')}/api/rums` }
    }
  };
  
  res.json(response);
};

const updateRum = (req, res) => {
  const data = loadData();
  const rum = data.rum;
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Rum nie znaleziony' });
  }

  const updatedRum = { ...rum[index], ...req.body };
  rum[index] = updatedRum;
  saveData({ ...data, rum });
  res.json(updatedRum);
};

const partialUpdateRum = (req, res) => {
  const data = loadData();
  const rum = data.rum;
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Rum nie znaleziony' });
  }

  const updatedRum = { ...rum[index], ...req.body };
  rum[index] = updatedRum;
  saveData({ ...data, rum });
  res.json(updatedRum);
};

const deleteRum = (req, res) => {
  const data = loadData();
  const rum = data.rum;
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Rum nie znaleziony' });
  }

  rum.splice(index, 1);
  saveData({ ...data, rum });
  res.status(204).send();
};

export default {
  getAllRum,
  createRum,
  getRumById,
  updateRum,
  partialUpdateRum,
  deleteRum
};
