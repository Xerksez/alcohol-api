import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('../alcohol-api/data/alcoholData.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);


const vodkas = data.vodkas;

export const resolvers = {
  Query: {
    vodkas: () => vodkas,
    vodka: (_, { id }) => vodkas.find(v => v.id === id),
  },
  Mutation: {
    createVodka: (_, { name, type, abv, country, details }) => {
      const newVodka = {
        id: `${vodkas.length + 1}`,
        name,
        type,
        abv,
        country,
        details
      };
      vodkas.push(newVodka);
      
      // Zapisz nowy obiekt do pliku JSON
      fs.writeFileSync(dataPath, JSON.stringify({ vodkas }, null, 2));
      
      return newVodka;
    }
  }
};
