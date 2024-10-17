const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data).whiskies;
};

const saveData = (data) => {
  const fileData = fs.readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.whiskies = data;
  fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

exports.getAllWhiskies = (req, res) => {
  const whiskies = loadData();
  res.json(whiskies);
};

exports.createWhisky = (req, res) => {
  const whiskies = loadData();
  const newWhisky = req.body;

  if (!newWhisky.name || !newWhisky.type) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const exists = whiskies.find(w => w.name === newWhisky.name);
  if (exists) {
    return res.status(409).json({ error: "Whisky już istnieje" });
  }

  whiskies.push(newWhisky);
  saveData(whiskies);
  res.status(201).json(newWhisky);
};

exports.getWhiskyById = (req, res) => {
  const whiskies = loadData();
  const whisky = whiskies.find(w => w.id === parseInt(req.params.id));
  if (!whisky) return res.status(404).send('Whisky nie znaleziona');
  res.json(whisky);
};

exports.updateWhisky = (req, res) => {
  const whiskies = loadData();
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziona');

  const updatedWhisky = { ...whiskies[index], ...req.body };
  whiskies[index] = updatedWhisky;
  saveData(whiskies);
  res.json(updatedWhisky);
};

exports.partialUpdateWhisky = (req, res) => {
  const whiskies = loadData();
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziona');

  const updatedWhisky = { ...whiskies[index], ...req.body };
  whiskies[index] = updatedWhisky;
  saveData(whiskies);
  res.json(updatedWhisky);
};

exports.deleteWhisky = (req, res) => {
  const whiskies = loadData();
  const index = whiskies.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Whisky nie znaleziona');

  whiskies.splice(index, 1);
  saveData(whiskies);
  res.status(204).send();
};
