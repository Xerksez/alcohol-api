import fs from 'fs';
import path from 'path';
import { GraphQLScalarType, Kind } from 'graphql';

const dataPath = path.resolve('../alcohol-api/data/alcoholData.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);

const vodkas = data.vodkas;
const rums= data.rums;
const whiskies = data.whiskies;
const wines = data.wines;

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Własny scalar do obsługi dat w formacie ISO',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  Date: DateScalar,
  Query: {
    vodkas: (_, { filter, sort, pagination }) => {
      let result = vodkas || [];
      if (filter) {
        if (filter.name) {
          if (filter.name.eq) result = result.filter(v => v.name === filter.name.eq);
          if (filter.name.contains) result = result.filter(v => v.name.includes(filter.name.contains));
          if (filter.name.neq) result = result.filter(v => v.name !== filter.name.neq);
          if (filter.name.notContains) result = result.filter(v => !v.name.includes(filter.name.notContains));
        }
        if (filter.abv) {
          if (filter.abv.eq) result = result.filter(v => v.abv === filter.abv.eq);
          if (filter.abv.gt) result = result.filter(v => v.abv > filter.abv.gt);
          if (filter.abv.lt) result = result.filter(v => v.abv < filter.abv.lt);
          if (filter.abv.gte) result = result.filter(v => v.abv >= filter.abv.gte);
          if (filter.abv.lte) result = result.filter(v => v.abv <= filter.abv.lte);
        }
        if (filter.country) {
          if (filter.country.eq) result = result.filter(v => v.country === filter.country.eq);
          if (filter.country.neq) result = result.filter(v => v.country !== filter.country.neq);
        }
      }

      if (sort) {
        result = result.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
      }

      if (pagination) {
        const { limit, offset } = pagination;
        result = result.slice(offset, offset + limit);
      }

      return result.map(v => ({ ...v, createdAt: v.createdAt || new Date() }));
    },
    vodka: (_, { id }) => {
      const vodka = vodkas.find(v => v.id === id);
      if (!vodka) {
        throw new Error(`Vodka with ID ${id} not found.`);
      }
      return { ...vodka, createdAt: vodka.createdAt || new Date() };
    },
    rums: () => rums.map(rum => ({ ...rum, createdAt: rum.createdAt || new Date() })),
    rum: (_, { id }) => {
      const rum = rums.find(r => r.id === id);
      if (!rum) {
        throw new Error(`Rum with ID ${id} not found.`);
      }
      return { ...rum, createdAt: rum.createdAt || new Date() };
    },
    wines: () => wines.map(wine => ({ ...wine, createdAt: wine.createdAt || new Date() })),
    wine: (_, { id }) => {
      const wine = wines.find(w => w.id === id);
      if (!wine) {
        throw new Error(`Wine with ID ${id} not found.`);
      }
      return { ...wine, createdAt: wine.createdAt || new Date() };
    },
    whiskies: () => whiskies.map(whiskey => ({ ...whiskey, createdAt: whiskey.createdAt || new Date() })),
    whiskey: (_, { id }) => {
      const whiskey = whiskies.find(w => w.id === id);
      if (!whiskey) {
        throw new Error(`Whiskey with ID ${id} not found.`);
      }
      return { ...whiskey, createdAt: whiskey.createdAt || new Date() };
    },
  },
  Mutation: {
    createVodka: (_, args) => createItem(args, vodkas),
    updateVodka: (_, args) => updateItem(args, vodkas),
    patchVodka: (_, args) => patchItem(args, vodkas),
    deleteVodka: (_, { id }) => deleteItem(id, vodkas),

    createRum: (_, args) => createItem(args, rums),
    updateRum: (_, args) => updateItem(args, rums),
    patchRum: (_, args) => patchItem(args, rums),
    deleteRum: (_, { id }) => deleteItem(id, rums),

    createWine: (_, args) => createItem(args, wines),
    updateWine: (_, args) => updateItem(args, wines),
    patchWine: (_, args) => patchItem(args, wines),
    deleteWine: (_, { id }) => deleteItem(id, wines),

    createWhiskey: (_, args) => createItem(args, whiskies),
    updateWhiskey: (_, args) => updateItem(args, whiskies),
    patchWhiskey: (_, args) => patchItem(args, whiskies),
    deleteWhiskey: (_, { id }) => deleteItem(id, whiskies),
  },
};

const createItem = (args, collection) => {
  const newItem = {
    id: collection.length > 0 ? Math.max(...collection.map(v => v.id)) + 1 : 1,
    ...args,
    createdAt: new Date(),
    details: {
      ...args.details,
      awards: {
        international: args.details.awards.international.map(Number),
        domestic: args.details.awards.domestic.map(Number),
      },
    },
  };
  collection.push(newItem);
  fs.writeFileSync(dataPath, JSON.stringify({ vodkas, rums, wines, whiskies }, null, 2));
  return newItem;
};

const updateItem = ({ id, ...updates }, collection) => {
  const index = collection.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Item with ID ${id} not found.`);
  }
  const existingItem = collection[index];
  const updatedItem = {
    ...existingItem,
    ...updates,
    createdAt: existingItem.createdAt || new Date(),
    details: {
      ...existingItem.details,
      ...updates.details,
      awards: {
        international: updates.details?.awards?.international
          ? updates.details.awards.international.map(Number)
          : existingItem.details.awards.international,
        domestic: updates.details?.awards?.domestic
          ? updates.details.awards.domestic.map(Number)
          : existingItem.details.awards.domestic,
      },
    },
  };
  collection[index] = updatedItem;
  fs.writeFileSync(dataPath, JSON.stringify({ vodkas, rums, wines, whiskies }, null, 2));
  return updatedItem;
};

const patchItem = ({ id, ...patch }, collection) => {
  const index = collection.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Item with ID ${id} not found.`);
  }
  const existingItem = collection[index];
  const patchedItem = {
    ...existingItem,
    ...patch,
    createdAt: existingItem.createdAt || new Date(),
    details: {
      ...existingItem.details,
      ...patch.details,
      awards: {
        international: patch.details?.awards?.international
          ? patch.details.awards.international.map(Number)
          : existingItem.details.awards.international,
        domestic: patch.details?.awards?.domestic
          ? patch.details.awards.domestic.map(Number)
          : existingItem.details.awards.domestic,
      },
    },
  };
  collection[index] = patchedItem;
  fs.writeFileSync(dataPath, JSON.stringify({ vodkas, rums, wines, whiskies }, null, 2));
  return patchedItem;
};

const deleteItem = (id, collection) => {
  const index = collection.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Item with ID ${id} not found.`);
  }
  collection.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify({ vodkas, rums, wines, whiskies }, null, 2));
  return true;
};
