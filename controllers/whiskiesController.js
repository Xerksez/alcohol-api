import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const dataFilePath = join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).whiskies;
};

const saveData = (data) => {
  const fileData = readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.whiskies = data;
  writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

const getAllWhiskies = (req, res) => {
  const whiskies = loadData();
  res.json(whiskies);
};

const createWhisky = (req, res) => {
  const whiskies = loadData();
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
  saveData(whiskies);

  res.status(201).location(`/api/whiskies/${newWhisky.id}`).json(newWhisky);
};

const getWhiskyById = (req, res) => {
  const whiskies = loadData();
  const whisky = whiskies.find(w => w.id === parseInt(req.params.id));
  if (!whisky) return res.status(404).send('Whisky nie znaleziona');

  const response = {
    ...whisky,
    _links: {
      self: { href: `/api/whiskies/${whisky.id}` },
      update: { href: `/api/whiskies/${whisky.id}` },
      delete: { href: `/api/whiskies/${whisky.id}` }
    }
  };

  res.json(response);
};

const updateWhisky = (req, res) => {
  const whiskies = loadData();
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziona');

  const updatedWhisky = { ...whiskies[index], ...req.body };
  whiskies[index] = updatedWhisky;
  saveData(whiskies);
  res.json(updatedWhisky);
};

const partialUpdateWhisky = (req, res) => {
  const whiskies = loadData();
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziona');

  const updatedWhisky = { ...whiskies[index], ...req.body };
  whiskies[index] = updatedWhisky;
  saveData(whiskies);
  res.json(updatedWhisky);
};

const deleteWhisky = (req, res) => {
  const whiskies = loadData();
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziona');

  whiskies.splice(index, 1);
  saveData(whiskies);
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
