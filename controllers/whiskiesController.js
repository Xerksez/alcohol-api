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

const getAllWhiskies = (req, res) => {
  const data = loadData();
  const whiskies = data.whiskies;
  const awardsList = data.awards;

  const response = whiskies.map(whisky => ({
    ...whisky,
    details: {
      ...whisky.details,
      awards: {
        international: mapAwards(whisky.details.awards.international, awardsList),
        domestic: mapAwards(whisky.details.awards.domestic, awardsList)
      }
    },
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/whiskies/${whisky.id}` }
    }
  }));

  res.json(response);
};

const createWhisky = (req, res) => {
  const data = loadData();
  const whiskies = data.whiskies;
  const newWhisky = req.body;

  if (!newWhisky.name || !newWhisky.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = whiskies.find(w => w.name === newWhisky.name);
  if (exists) {
    return res.status(409).json({ error: "Whisky już istnieje" });
  }

  newWhisky.id = whiskies.length > 0 ? whiskies[whiskies.length - 1].id + 1 : 1;
  whiskies.push(newWhisky);
  saveData({ ...data, whiskies });

  res.status(201).location(`/api/whiskies/${newWhisky.id}`).json(newWhisky);
};

const getWhiskyById = (req, res) => {
  const data = loadData();
  const awardsList = data.awards;
  const whisky = data.whiskies.find(w => w.id === parseInt(req.params.id));
  if (!whisky) return res.status(404).send('Whisky nie znaleziony');

  whisky.details.awards = {
    international: mapAwards(whisky.details.awards.international, awardsList),
    domestic: mapAwards(whisky.details.awards.domestic, awardsList)
  };

  const response = {
    ...whisky,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/whiskies/${whisky.id}` },
      allWhiskies: { href: `${req.protocol}://${req.get('host')}/api/whiskies` },
      createWhisky: { href: `${req.protocol}://${req.get('host')}/api/whiskies` },
      updateWhisky: { href: `${req.protocol}://${req.get('host')}/api/whiskies/${whisky.id}` },
      partialUpdateWhisky: { href: `${req.protocol}://${req.get('host')}/api/whiskies/${whisky.id}` },
      deleteWhisky: { href: `${req.protocol}://${req.get('host')}/api/whiskies/${whisky.id}` },
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

const updateWhisky = (req, res) => {
  const data = loadData();
  const whiskies = data.whiskies;
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziony');

  const updatedWhisky = { ...whiskies[index], ...req.body };
  whiskies[index] = updatedWhisky;
  saveData({ ...data, whiskies });
  res.json(updatedWhisky);
};

const partialUpdateWhisky = (req, res) => {
  const data = loadData();
  const whiskies = data.whiskies;
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziony');

  const updatedWhisky = { ...whiskies[index], ...req.body };
  whiskies[index] = updatedWhisky;
  saveData({ ...data, whiskies });
  res.json(updatedWhisky);
};

const deleteWhisky = (req, res) => {
  const data = loadData();
  const whiskies = data.whiskies;
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziony');

  whiskies.splice(index, 1);
  saveData({ ...data, whiskies });
  res.status(204).send();
};

export default {
  getAllWhiskies,
  createWhisky,
  getWhiskyById,
  updateWhisky,
  partialUpdateWhisky,
  deleteWhisky
};
