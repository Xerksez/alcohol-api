const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data).wines;
};

const saveData = (data) => {
  const fileData = fs.readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.wines = data;
  fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

exports.getAllWines = (req, res) => {
  const wines = loadData();
  res.json(wines);
};

exports.createWine = (req, res) => {
  const wines = loadData();
  const newWine = req.body;

  if (!newWine.name || !newWine.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = wines.find(w => w.name === newWine.name);
  if (exists) {
    return res.status(409).json({ error: "Wino już istnieje" });
  }

  wines.push(newWine);
  saveData(wines);
  res.status(201).json(newWine);
};

exports.getWineById = (req, res) => {
  const wines = loadData();
  const wine = wines.find(w => w.id === parseInt(req.params.id));
  if (!wine) return res.status(404).send('Wino nie znalezione');
  res.json(wine);
};

exports.updateWine = (req, res) => {
  const wines = loadData();
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znalezione');

  const updatedWine = { ...wines[index], ...req.body };
  wines[index] = updatedWine;
  saveData(wines);
  res.json(updatedWine);
};

exports.partialUpdateWine = (req, res) => {
  const wines = loadData();
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znalezione');

  const updatedWine = { ...wines[index], ...req.body };
  wines[index] = updatedWine;
  saveData(wines);
  res.json(updatedWine);
};

exports.deleteWine = (req, res) => {
  const wines = loadData();
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znalezione');

  wines.splice(index, 1);
  saveData(wines);
  res.status(204).send();
};
