---
title: GraphQL API
slug: graphql
---

### Typy i Zapytania

GraphQL obsługuje operacje na następujących zasobach:
- Wódki (`vodkas`)
- Rumy (`rums`)
- Wina (`wines`)
- Whiskey (`whiskies`)

#### Endpoint GraphQL
Wszystkie zapytania i mutacje są obsługiwane pod adresem:
[http://localhost:3000/graphql](http://localhost:3000/graphql)

---

### Przykłady zapytań

#### Pobranie listy whiskey
```graphql
query GetWhiskies {
  whiskies {
    id
    name
    type
    abv
    country
    createdAt
    details {
      distillery
      year
      awards {
        international
        domestic
      }
    }
  }
}
```

#### Pobranie szczegółów rumu po ID
```graphql
query GetRumById {
  rum(id: 2) {
    id
    name
    type
    abv
    country
    createdAt
  }
}
```

#### Paginacja i sortowanie
Pobranie pierwszych 5 win posortowanych po `abv`:
```graphql
query PaginatedWines {
  wines(sort: "abv", pagination: { limit: 5, offset: 0 }) {
    id
    name
    abv
    country
  }
}
```

#### Filtracja
Pobranie listy rumów starszych niż 50 lat:
```graphql
query FilteredRums {
  rums(filter: { details: { year: { lt: 1973 } } }) {
    id
    name
    details {
      year
      distillery
    }
  }
}
```

---

### Przykłady Mutacji

#### Stworzenie nowego whiskey
```graphql
mutation CreateWhiskey {
  createWhiskey(
    name: "New Whiskey",
    type: "Single Malt",
    abv: 40,
    country: "Scotland",
    details: {
      distillery: "Highland Distillery",
      year: 1990,
      awards: {
        international: [1, 2],
        domestic: [3]
      }
    }
  ) {
    id
    name
    abv
    country
    createdAt
  }
}
```

#### Cześciowa aktualizacja wina
```graphql
mutation PatchWine {
  patchWine(
    id: 3,
    name: "Updated Wine",
    details: { year: 2020 }
  ) {
    id
    name
    details {
      year
    }
  }
}
```

#### Usunięcie rumu
```graphql
mutation DeleteRum {
  deleteRum(id: 4)
}
```

---

### Obsługiwane funkcje

#### Filtry
Filtry są dostępne dla każdego zasobu i obsługują zagnieżdżone pola:
- **String**: `eq`, `contains`, `neq`, `notContains`.
- **Number**: `eq`, `gt`, `lt`, `gte`, `lte`.

#### Sortowanie
Dostępne jest sortowanie po dowolnym polu, np.:
```graphql
query {
  vodkas(sort: "name") {
    id
    name
  }
}
```

#### Paginacja
Możesz ograniczyć wyniki za pomocą `limit` i `offset`:
```graphql
query {
  rums(pagination: { limit: 10, offset: 20 }) {
    id
    name
  }
}
```

---
