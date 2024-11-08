import express, { json } from 'express';
import cors from 'cors';
const app = express();
import vodkasRoutes from './routes/vodkas.js';
import winesRoutes from './routes/wines.js';
import whiskiesRoutes from './routes/whiskies.js';
import rumRoutes from './routes/rums.js';
// import {expressMiddleware} from "@apollo/server/express4"

// app.use('/graphql', cors(), express.json(), expressMiddleware(apollServer))

// const typeDefs = `#graphql

// `

// const resolvers= `

// `
// const apollServer = new ApolloServer(typeDefs,resolvers);
// await apollServer.start();



const corsOptions = {
  origin: 'localhost',
  allowedHeaders: 'Content-Type, Cache-Control, Access-Control-Allow-Methods', 
};

const dzialajaceMetody = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(415).json({ error: 'zły format' });
    }
  }

  if (!dzialajaceMetody.includes(req.method)) {
    return res.status(405).json({ error: `Metoda ${req.method} nie jest dozwolona, dozwolone są: ${dozwoloneMetody.join(', ')}` });
  }

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