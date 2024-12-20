---
title: GraphQL API
slug: graphql
---
## GraphQL API

### Typy i Zapytania
GraphQL obsługuje operacje na wódkach, takie jak pobieranie listy, szczegółów oraz tworzenie nowych zasobów. Endpoint znajduje się pod adresem:

[http://localhost:3000/graphql](http://localhost:3000/graphql)
`http://localhost:3000/graphql`

#### Przykładowe zapytanie

Pobranie listy wódek:
```graphql
query {
  vodkas {
    id
    name
    abv
  }
}
```

---