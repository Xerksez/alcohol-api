import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).vodkas;
};

const saveData = (data) => {
  const fileData = readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.vodkas = data;
  writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

const getAllVodkas = (req, res) => {
  const vodkas = loadData();
  res.json(vodkas);
};

const createVodka = (req, res) => {
  const { name, type, abv, country, details } = req.body;

  if (!name || !type || !abv || !country || !details) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const vodkas = loadData();
  const exists = vodkas.find(v => v.name === name);
  if (exists) {
    return res.status(409).json({ error: "Wódka już istnieje" });
  }

  const newVodka = { ...req.body, id: vodkas.length > 0 ? vodkas[vodkas.length - 1].id + 1 : 1 };
  vodkas.push(newVodka);
  saveData(vodkas);

  res.status(201).location(`/api/vodkas/${newVodka.id}`).json(newVodka);
};

const getVodkaById = (req, res) => {
  const vodkas = loadData();
  const vodka = vodkas.find(v => v.id === parseInt(req.params.id));
  if (!vodka) return res.status(404).send('Wódka nie znaleziona');
//hateos
  const response = {
    ...vodka,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
      update: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
      delete: { href: `${req.protocol}://${req.get('host')}/api/vodkas/${vodka.id}` },
      allVodkas:{href: `${req.protocol}://${req.get('host')}/api/vodkas`}
    }
  };

  res.json(response);
};

const updateVodka = (req, res) => {
  const vodkas = loadData();
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  const updatedVodka = { ...vodkas[index], ...req.body };
  vodkas[index] = updatedVodka;
  saveData(vodkas);
  res.json(updatedVodka);
};

const partialUpdateVodka = (req, res) => {
  const vodkas = loadData();
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  const updatedVodka = { ...vodkas[index], ...req.body };
  vodkas[index] = updatedVodka;
  saveData(vodkas);
  res.json(updatedVodka);
};

const deleteVodka = (req, res) => {
  const vodkas = loadData();
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  vodkas.splice(index, 1);
  saveData(vodkas);
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
