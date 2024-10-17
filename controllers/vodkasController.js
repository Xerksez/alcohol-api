const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/alcoholData.json');

const loadData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data).vodkas;
};

const saveData = (data) => {
  const fileData = fs.readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.vodkas = data;
  fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

exports.getAllVodkas = (req, res) => {
  const vodkas = loadData();
  res.json(vodkas);
};

exports.createVodka = (req, res) => {
    const { name, type, abv, country, details } = req.body;

    if (!name || !type || !abv || !country || !details) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane" });
    }

  const vodkas = loadData();
  const exists = vodkas.find(v => v.name === name);
  if (exists) {
    return res.status(409).json({ error: "Wódka już istnieje" });
  }

  const newVodka = req.body;
  vodkas.push(newVodka);
  saveData(vodkas);
  res.status(201).json(newVodka);
};

exports.getVodkaById = (req, res) => {
  const vodkas = loadData();
  const vodka = vodkas.find(v => v.id === parseInt(req.params.id));
  if (!vodka) return res.status(404).send('Wódka nie znaleziona');
  res.json(vodka);
};

exports.updateVodka = (req, res) => {
  const vodkas = loadData();
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  const updatedVodka = { ...vodkas[index], ...req.body };
  vodkas[index] = updatedVodka;
  saveData(vodkas);
  res.json(updatedVodka);
};

exports.partialUpdateVodka = (req, res) => {
  const vodkas = loadData();
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  const updatedVodka = { ...vodkas[index], ...req.body };
  vodkas[index] = updatedVodka;
  saveData(vodkas);
  res.json(updatedVodka);
};

exports.deleteVodka = (req, res) => {
  const vodkas = loadData();
  const index = vodkas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wódka nie znaleziona');

  vodkas.splice(index, 1);
  saveData(vodkas);
  res.status(204).send();
};
