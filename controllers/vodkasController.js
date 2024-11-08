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

const getAllVodkas = (req, res) => {
  const data = loadData();
  const vodkas = data.vodkas;
  const awardsList = data.awards;

  const response = vodkas.map(vodka => ({
    ...vodka,
    details: {
      ...vodka.details,
      awards: {
        international: mapAwards(vodka.details.awards.international, awardsList),
        domestic: mapAwards(vodka.details.awards.domestic, awardsList)
      }
    },
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` }
    }
  }));

  res.json(response);
};

const createVodka = (req, res) => {
  const data = loadData();
  const vodkas = data.vodkas;
  const newVodka = req.body;

  if (!newVodka.name || !newVodka.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = vodkas.find(v => v.name === newVodka.name);
  if (exists) {
    return res.status(409).json({ error: "Wódka już istnieje" });
  }

  newVodka.id = vodkas.length > 0 ? vodkas[vodkas.length - 1].id + 1 : 1;
  vodkas.push(newVodka);
  saveData({ ...data, vodkas });

  res.status(201).location(`/api/vodkas/${newVodka.id}`).json(newVodka);
};

const getVodkaById = (req, res) => {
  const data = loadData();
  const awardsList = data.awards;
  const vodka = data.vodkas.find(v => v.id === parseInt(req.params.id));
  if (!vodka) return res.status(404).send('Wódka nie znaleziona');

  vodka.details.awards = {
    international: mapAwards(vodka.details.awards.international, awardsList),
    domestic: mapAwards(vodka.details.awards.domestic, awardsList)
  };

  const response = {
    ...vodka,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
      allVodkas: { href: `${req.protocol}://${req.get('host')}/api/vodkas` },
      createVodka: { href: `${req.protocol}://${req.get('host')}/api/vodkas` },
      updateVodka: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
      partialUpdateVodka: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
      deleteVodka: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
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

const updateVodka = (req, res) => {
  const data = loadData();
  const vodkas = data.vodkas;
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  const updatedVodka = { ...vodkas[index], ...req.body };
  vodkas[index] = updatedVodka;
  saveData({ ...data, vodkas });
  res.json(updatedVodka);
};

const partialUpdateVodka = (req, res) => {
  const data = loadData();
  const vodkas = data.vodkas;
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  const updatedVodka = { ...vodkas[index], ...req.body };
  vodkas[index] = updatedVodka;
  saveData({ ...data, vodkas });
  res.json(updatedVodka);
};

const deleteVodka = (req, res) => {
  const data = loadData();
  const vodkas = data.vodkas;
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  vodkas.splice(index, 1);
  saveData({ ...data, vodkas });
  res.status(204).send();
};

export default {
  getAllVodkas,
  createVodka,
  getVodkaById,
  updateVodka,
  partialUpdateVodka,
  deleteVodka
};
