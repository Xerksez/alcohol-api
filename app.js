import express, { json } from 'express';
import cors from 'cors';
const app = express();
import vodkasRoutes from './routes/vodkas.js';
import winesRoutes from './routes/wines.js';
import whiskiesRoutes from './routes/whiskies.js';
import rumRoutes from './routes/rums.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

// Dodaj interfejs Swaggera
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('Swagger dostępny pod adresem: http://localhost:3000/swagger');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(apolloServer));

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
//npx create-docusaurus@latest alcohol-api-docs classic --typescript
//