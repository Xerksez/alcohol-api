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

const mapAwards = (awardIds, awardsList) => {
  return awardIds.map(id => awardsList.find(award => award.id === id));
};

const getAllRums = (req, res) => {
  const data = loadData();
  const rums = data.rums;
  const awardsList = data.awards;

  const response = rums.map(rum => ({
    ...rum,
    details: {
      ...rum.details,
      awards: {
        international: mapAwards(rum.details.awards.international, awardsList),
        domestic: mapAwards(rum.details.awards.domestic, awardsList)
      }
    },
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/rums/${rum.id}` }
    }
  }));

  res.json(response);
};

const createRum = (req, res) => {
  const data = loadData();
  const rums = data.rums;
  const newRum = req.body;

  if (!newRum.name || !newRum.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = rums.find(r => r.name === newRum.name);
  if (exists) {
    return res.status(409).json({ error: "Rum już istnieje" });
  }

  newRum.id = rums.length > 0 ? rums[rums.length - 1].id + 1 : 1;
  rums.push(newRum);
  saveData({ ...data, rums });

  res.status(201).location(`/api/rums/${newRum.id}`).json(newRum);
};

const getRumById = (req, res) => {
  const data = loadData();
  const awardsList = data.awards;
  const rum = data.rums.find(r => r.id === parseInt(req.params.id));
  if (!rum) return res.status(404).send('Rum nie znaleziony');

  rum.details.awards = {
    international: mapAwards(rum.details.awards.international, awardsList),
    domestic: mapAwards(rum.details.awards.domestic, awardsList)
  };

  const response = {
    ...rum,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/rums/${rum.id}` },
      allRums: { href: `${req.protocol}://${req.get('host')}/api/rums` },
      createRum: { href: `${req.protocol}://${req.get('host')}/api/rums` },
      updateRum: { href: `${req.protocol}://${req.get('host')}/api/rums/${rum.id}` },
      partialUpdateRum: { href: `${req.protocol}://${req.get('host')}/api/rums/${rum.id}` },
      deleteRum: { href: `${req.protocol}://${req.get('host')}/api/rums/${rum.id}` },
      home: {
        vodkas: { href: `${req.protocol}://${req.get('host')}/api/vodkas` },
        whiskies: { href: `${req.protocol}://${req.get('host')}/api/whiskies` },
        wines: { href: `${req.protocol}://${req.get('host')}/api/wines` },
        rums: { href: `${req.protocol}://${req.get('host')}/api/rums` }
      }
    }
  };

  res.json(response);
};

const updateRum = (req, res) => {
  const data = loadData();
  const rums = data.rums;
  const index = rums.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rums[index], ...req.body };
  rums[index] = updatedRum;
  saveData({ ...data, rums });
  res.json(updatedRum);
};

const partialUpdateRum = (req, res) => {
  const data = loadData();
  const rums = data.rums;
  const index = rums.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rums[index], ...req.body };
  rums[index] = updatedRum;
  saveData({ ...data, rums });
  res.json(updatedRum);
};

const deleteRum = (req, res) => {
  const data = loadData();
  const rums = data.rums;
  const index = rums.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  rums.splice(index, 1);
  saveData({ ...data, rums });
  res.status(204).send();
};

export default {
  getAllRums,
  createRum,
  getRumById,
  updateRum,
  partialUpdateRum,
  deleteRum
};
