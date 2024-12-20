---
title: Dokumentacja api Mocnych alkoholi
slug: start
---
# Dokumentacja API

[Dokumentacja w Swaggerze](http://localhost:3000/swagger)

# Wprowadzenie
<img src="/img/brmn.jpg" alt="barman na sterydach" width="300"/>

Czy kiedykolwiek marzyłeś o API, które zarządza alkoholem jakby było barmanem na sterydach? To właśnie jest to! Nasze API to nie tylko narzędzie, ale i cyfrowy mistrz ceremonii, który zorganizuje Twoje wódki, rumy i inne trunki, jak prawdziwy sommelier z sercem programisty.
Aplikacja obsługuje REST API, GraphQL oraz gRPC do zarządzania danymi dotyczącymi różnych rodzajów alkoholi, takich jak rum, wódka, whisky i wino.

# Instrukcja instalacji
```
git clone https://github.com/Xerksez/alcohol-api.git 
```
[Można pobrać także .zip z linku](https://github.com/Xerksez/alcohol-api)
```
cd alcohol-api
npm install
```


## Wszystkie potrzebne bilbioteki:
```
    "nodemon": "^3.1.7"
    "@apollo/server": "^4.11.2",
    "@grpc/grpc-js": "^1.12.2",
    "@grpc/proto-loader": "^0.7.13",
    "api": "^6.1.2",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "express": "^4.21.1",
    "express4": "^0.0.1",
    "graphql": "^16.9.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
```
## Sposób uruchomienia

Aplikacja zawiera kilka skryptów pomocnych do uruchamiania i rozwijania projektu:

- `start`: Uruchamia serwer REST oraz GraphQL na porcie `3000`.
  ```bash
  npm run start
  ```

- `dev`: Uruchamia serwer w trybie deweloperskim z użyciem `nodemon`.
  ```bash
  npm run dev
  ```

- `startGrpc`: Uruchamia serwer gRPC z dodatkowym logowaniem debugowym.
  ```bash
  npm run startGrpc
  ```
---
# Linki do dokumentacji
[Dokumentacja REST API](http://localhost:3000/docs/rest)

[Dokumentacja GraphQL API](http://localhost:3000/docs/graphql)

[Dokumentacja gRPC API](http://localhost:3000/docs/grpc)