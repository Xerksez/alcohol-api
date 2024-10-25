import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).wines;
};

const saveData = (data) => {
  const fileData = readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.wines = data;
  writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

const getAllWines = (req, res) => {
  const wines = loadData();
  res.json(wines);
};

const createWine = (req, res) => {
  const wines = loadData();
  const newWine = req.body;

  if (!newWine.name || !newWine.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = wines.find(w => w.name === newWine.name);
  if (exists) {
    return res.status(409).json({ error: "Wino już istnieje" });
  }

  newWine.id = wines.length > 0 ? wines[wines.length - 1].id + 1 : 1;
  wines.push(newWine);
  saveData(wines);

  res.status(201).location(`/api/wines/${newWine.id}`).json(newWine);
};

const getWineById = (req, res) => {
  const wines = loadData();
  const wine = wines.find(w => w.id === parseInt(req.params.id));
  if (!wine) return res.status(404).send('Wino nie znalezione');
//hateos
  const response = {
    ...wine,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
      update: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
      delete: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
      allWines:{href: `${req.protocol}://${req.get('host')}/api/wines`}
    }
  };

  res.json(response);
};

const updateWine = (req, res) => {
  const wines = loadData();
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znaleziona');

  const updatedWine = { ...wines[index], ...req.body };
  wines[index] = updatedWine;
  saveData(wines);
  res.json(updatedWine);
};

const partialUpdateWine = (req, res) => {
  const wines = loadData();
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znaleziona');

  const updatedWine = { ...wines[index], ...req.body };
  wines[index] = updatedWine;
  saveData(wines);
  res.json(updatedWine);
};

const deleteWine = (req, res) => {
  const wines = loadData();
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znaleziona');

  wines.splice(index, 1);
  saveData(wines);
  res.status(204).send();
};

export default {
  getAllWines,
  createWine,
  getWineById,
  updateWine,
  partialUpdateWine,
  deleteWine
};
