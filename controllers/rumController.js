import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const dataFilePath = join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).rum;
};

const saveData = (data) => {
  const fileData = readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.rum = data;
  writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

const getAllRum = (req, res) => {
  const rum = loadData();
  res.json(rum);
};

const createRum = (req, res) => {
  const rum = loadData();
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
  saveData(rum);

  res.status(201).location(`/api/rum/${newRum.id}`).json(newRum);
};

const getRumById = (req, res) => {
  const rum = loadData();
  const singleRum = rum.find(r => r.id === parseInt(req.params.id));
  if (!singleRum) return res.status(404).send('Rum nie znaleziony');

  const response = {
    ...singleRum,
    _links: {
      self: { href: `/api/rum/${singleRum.id}` },
      update: { href: `/api/rum/${singleRum.id}` },
      delete: { href: `/api/rum/${singleRum.id}` }
    }
  };

  res.json(response);
};

const updateRum = (req, res) => {
  const rum = loadData();
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rum[index], ...req.body };
  rum[index] = updatedRum;
  saveData(rum);
  res.json(updatedRum);
};

const partialUpdateRum = (req, res) => {
  const rum = loadData();
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rum[index], ...req.body };
  rum[index] = updatedRum;
  saveData(rum);
  res.json(updatedRum);
};

const deleteRum = (req, res) => {
  const rum = loadData();
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  rum.splice(index, 1);
  saveData(rum);
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
