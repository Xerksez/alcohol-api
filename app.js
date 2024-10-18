import express, { json } from 'express';
const app = express();
// import vodkasRoutes from './routes/vodkas.js';
// import winesRoutes from './routes/wines.js';
// import whiskiesRoutes from './routes/whiskies.js';
// import rumRoutes from './routes/rums.js';

// app.use(json());

// app.use('/api/vodkas', vodkasRoutes);
// app.use('/api/wines', winesRoutes);
// app.use('/api/whiskies', whiskiesRoutes);
// app.use('/api/rum', rumRoutes);

import test from './routes/testModule.js';
test();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

// 200 OK dla poprawnych operacji.
// 201 Created dla poprawnego utworzenia nowego zasobu.
// 400 Bad Request dla błędnych danych wejściowych.
// 404 Not Found dla nieistniejących zasobów.
// 409 Conflict w przypadku konfliktów (np. duplikat zasobu).