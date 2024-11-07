import express, { json } from 'express';
import cors from 'cors';
const app = express();
import vodkasRoutes from './routes/vodkas.js';
import winesRoutes from './routes/wines.js';
import whiskiesRoutes from './routes/whiskies.js';
import rumRoutes from './routes/rums.js';

const corsOptions = {
  origin: 'localhost',
  methods: 'GET, POST, PUT, DELETE, PATCH', 
  allowedHeaders: 'Content-Type, Cache-Control, Access-Control-Allow-Methods', 
};

const middlewareContentType = (req,res,next) => {
  const ct = req.get('Content-Type');
  if(ct !=='application/json'){
    res.status(400);
  }
next();
}

app.use(cors(corsOptions),middlewareContentType,(req, res, next) => {
  res.set({
    'Content-Type': 'application/json', 
    'Cache-Control': 'public, max-age=300', 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
  });
  next();
});

app.use('/api/vodkas', vodkasRoutes);
app.use('/api/wines', winesRoutes);
app.use('/api/whiskies', whiskiesRoutes);
app.use('/api/rums', rumRoutes);

// import test from './routes/testModule.js';
// test();

app.options('/api/vodkas', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, DELETE, PATCH,');
  res.sendStatus(200);
});

app.options('/api/wines', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, DELETE, PATCH,');
  res.sendStatus(200);
});

app.options('/api/whiskies', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, DELETE, PATCH,');
  res.sendStatus(200);
});

app.options('/api/rums', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, DELETE, PATCH,');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

// 200 OK dla poprawnych operacji.
// 201 Created dla poprawnego utworzenia nowego zasobu.
// 204 No content
// 400 Bad Request dla błędnych danych wejściowych.
// 404 Not Found dla nieistniejących zasobów.
// 409 Conflict w przypadku konfliktów (np. duplikat zasobu).