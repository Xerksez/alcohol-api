---
title: Dokumentacja api Mocnych alkoholi
---
# Dokumentacja API

# Wprowadzenie
<img src="/img/brmn.jpg" alt="barman na sterydach" width="300"/>

Czy kiedykolwiek marzyłeś o API, które zarządza alkoholem jakby było barmanem na sterydach? To właśnie jest to! Nasze API to nie tylko narzędzie, ale i cyfrowy mistrz ceremonii, który zorganizuje Twoje wódki, rumy i inne trunki, jak prawdziwy sommelier z sercem programisty.
Aplikacja obsługuje REST API, GraphQL oraz gRPC do zarządzania danymi dotyczącymi różnych rodzajów alkoholi, takich jak rum, wódka, whisky i wino.

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

## REST API

### Endpointy Rumów

#### `GET /api/rums`
- **Opis**: Pobiera listę wszystkich rumów.

#### `POST /api/rums`
- **Opis**: Tworzy nowy rum.

#### `GET /api/rums/:id`
- **Opis**: Pobiera szczegóły rumu o podanym `id`.

#### `PUT /api/rums/:id`
- **Opis**: Aktualizuje dane rumu o podanym `id`.

#### `PATCH /api/rums/:id`
- **Opis**: Częściowo aktualizuje dane rumu o podanym `id`.

#### `DELETE /api/rums/:id`
- **Opis**: Usuwa rum o podanym `id`.

---

## GraphQL API

### Typy i Zapytania
GraphQL obsługuje operacje na wódkach, takie jak pobieranie listy, szczegółów oraz tworzenie nowych zasobów. Endpoint znajduje się pod adresem:

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

## gRPC API

### Definicja protokołu
Serwis gRPC obsługuje dane dotyczące alkoholi. Endpoint serwera znajduje się pod adresem:

`127.0.0.1:9090`

### Uruchamianie serwera
Aby uruchomić serwer gRPC, wykonaj następujące polecenie:
```bash
npm run startGrpc
```

---

## Informacje dodatkowe

### Obsługa błędów
- `200 OK` - operacja zakończona sukcesem.
- `201 Created` - pomyślne utworzenie zasobu.
- `204 No Content` - usunięcie zasobu.
- `400 Bad Request` - błędne dane wejściowe.
- `404 Not Found` - zasób nie znaleziony.
- `409 Conflict` - konflikt (np. duplikat zasobu).

