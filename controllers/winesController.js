import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(__dirname, '../data/alcoholData.json');

// Funkcja do ładowania danych
const loadData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Funkcja do zapisywania danych
const saveData = (data) => {
  const fileData = readFileSync(dataFilePath);
  const json = JSON.parse(fileData);
  json.wines = data;
  writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
};

// Funkcja mapująca ID nagród na pełne obiekty nagród
const mapAwards = (awardIds, awardsList) => {
  return awardIds.map(id => awardsList.find(award => award.id === id));
};

// Pobierz wszystkie wina z pełnymi nagrodami
const getAllWines = (req, res) => {
  const data = loadData();
  const wines = data.wines;
  const awardsList = data.awards;
  console.log("Received data:", req.body);
  const response = wines.map(wine => ({
    ...wine,
    details: {
      ...wine.details,
      awards: {
        international: mapAwards(wine.details.awards.international, awardsList),
        domestic: mapAwards(wine.details.awards.domestic, awardsList)
      }
    },
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` }
    }
  }));

  res.json(response);
};

// Stwórz nowe wino
const createWine = (req, res) => {
  const data = loadData();
  const wines = data.wines;
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
  saveData({ ...data, wines });

  res.status(201).location(`/api/wines/${newWine.id}`).json(newWine);
};

// Pobierz szczegóły wina z pełnymi nagrodami
const getWineById = (req, res) => {
  const data = loadData();
  const awardsList = data.awards;
  const wine = data.wines.find(w => w.id === parseInt(req.params.id));
  if (!wine) return res.status(404).send('Wino nie znalezione');

  // Mapowanie nagród
  wine.details.awards = {
    international: mapAwards(wine.details.awards.international, awardsList),
    domestic: mapAwards(wine.details.awards.domestic, awardsList)
  };

  const response = {
    ...wine,
    _links: {
      self: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
      allWines: { href: `${req.protocol}://${req.get('host')}/api/wines` },
      createWine: { href: `${req.protocol}://${req.get('host')}/api/wines` },
      updateWine: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
      partialUpdateWine: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
      deleteWine: { href: `${req.protocol}://${req.get('host')}/api/wines/${wine.id}` },
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

// Aktualizuj wino
const updateWine = (req, res) => {
  const data = loadData();
  const wines = data.wines;
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znalezione');

  const updatedWine = { ...wines[index], ...req.body };
  wines[index] = updatedWine;
  saveData({ ...data, wines });
  res.json(updatedWine);
};

// Częściowa aktualizacja wina
const partialUpdateWine = (req, res) => {
  const data = loadData();
  const wines = data.wines;
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znalezione');

  const updatedWine = { ...wines[index], ...req.body };
  wines[index] = updatedWine;
  saveData({ ...data, wines });
  res.json(updatedWine);
};

// Usuń wino
const deleteWine = (req, res) => {
  const data = loadData();
  const wines = data.wines;
  const index = wines.findIndex(w => w.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Wino nie znalezione');

  wines.splice(index, 1);
  saveData({ ...data, wines });
  res.status(204).send();
};

// Eksportuj kontrolery
export default {
  getAllWines,
  createWine,
  getWineById,
  updateWine,
  partialUpdateWine,
  deleteWine
};
