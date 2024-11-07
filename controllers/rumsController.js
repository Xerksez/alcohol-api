import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(__dirname, '../data/alcoholData.json');

// Funkcja do ładowania danych
const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).rums;
};

// Funkcja do zapisywania danych
const saveData = (data) => {
  const fileData = readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.rums = data;
  writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

// Pobierz wszystkie rumy
const getAllRums = (req, res) => {
  const rums = loadData();

  const response = rums.map(rum => ({
    ...rum,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/rums/${rum.id}` }
    }
  }));

  res.json(response);
};

// Stwórz nowy rum
const createRum = (req, res) => {
  const rums = loadData();
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
  saveData(rums);

  res.status(201).location(`/api/rums/${newRum.id}`).json(newRum);
};

// Pobierz pojedynczy rum po ID z HATEOAS
const getRumById = (req, res) => {
  const rums = loadData();
  const rum = rums.find(r => r.id === parseInt(req.params.id));
  if (!rum) return res.status(404).send('Rum nie znaleziony');

  // HATEOAS
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

// Aktualizuj cały rum
const updateRum = (req, res) => {
  const rums = loadData();
  const index = rums.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rums[index], ...req.body };
  rums[index] = updatedRum;
  saveData(rums);
  res.json(updatedRum);
};

// Aktualizacja częściowa rumu
const partialUpdateRum = (req, res) => {
  const rums = loadData();
  const index = rums.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rums[index], ...req.body };
  rums[index] = updatedRum;
  saveData(rums);
  res.json(updatedRum);
};

// Usuń rum
const deleteRum = (req, res) => {
  const rums = loadData();
  const index = rums.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  rums.splice(index, 1);
  saveData(rums);
  res.status(204).send();
};

// Eksportuj wszystkie funkcje kontrolera
export default {
  getAllRums,
  createRum,
  getRumById,
  updateRum,
  partialUpdateRum,
  deleteRum
};
