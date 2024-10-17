const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data).rum;
};

const saveData = (data) => {
  const fileData = fs.readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.rum = data;
  fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

exports.getAllRum = (req, res) => {
  const rum = loadData();
  res.json(rum);
};

exports.createRum = (req, res) => {
  const rum = loadData();
  const newRum = req.body;

  if (!newRum.name || !newRum.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = rum.find(r => r.name === newRum.name);
  if (exists) {
    return res.status(409).json({ error: "Rum już istnieje" });
  }

  rum.push(newRum);
  saveData(rum);
  res.status(201).json(newRum);
};

exports.getRumById = (req, res) => {
  const rum = loadData();
  const singleRum = rum.find(r => r.id === parseInt(req.params.id));
  if (!singleRum) return res.status(404).send('Rum nie znaleziony');
  res.json(singleRum);
};

exports.updateRum = (req, res) => {
  const rum = loadData();
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rum[index], ...req.body };
  rum[index] = updatedRum;
  saveData(rum);
  res.json(updatedRum);
};

exports.partialUpdateRum = (req, res) => {
  const rum = loadData();
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  const updatedRum = { ...rum[index], ...req.body };
  rum[index] = updatedRum;
  saveData(rum);
  res.json(updatedRum);
};

exports.deleteRum = (req, res) => {
  const rum = loadData();
  const index = rum.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Rum nie znaleziony');

  rum.splice(index, 1);
  saveData(rum);
  res.status(204).send();
};
