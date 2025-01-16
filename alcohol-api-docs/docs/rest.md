---
title: REST API
slug: rest
---

### REST API

REST API obsługuje operacje na następujących zasobach:
- Wódki (`vodkas`)
- Rumy (`rums`)
- Wina (`wines`)
- Whiskey (`whiskies`)

#### Główny endpoint
Wszystkie operacje REST API są obsługiwane pod adresem:
[http://localhost:3000/](http://localhost:3000/)

---

### Endpointy

#### Wódki (`/api/vodkas`)
- **`GET /api/vodkas`** - Pobiera listę wszystkich wódek.
- **`POST /api/vodkas`** - Tworzy nową wódkę.
- **`GET /api/vodkas/:id`** - Pobiera szczegóły wódki o podanym `id`.
- **`PUT /api/vodkas/:id`** - Aktualizuje dane wódki o podanym `id`.
- **`PATCH /api/vodkas/:id`** - Cześciowo aktualizuje dane wódki o podanym `id`.
- **`DELETE /api/vodkas/:id`** - Usuwa wódkę o podanym `id`.

#### Rumy (`/api/rums`)
- **`GET /api/rums`** - Pobiera listę wszystkich rumów.
- **`POST /api/rums`** - Tworzy nowy rum.
- **`GET /api/rums/:id`** - Pobiera szczegóły rumu o podanym `id`.
- **`PUT /api/rums/:id`** - Aktualizuje dane rumu o podanym `id`.
- **`PATCH /api/rums/:id`** - Cześciowo aktualizuje dane rumu o podanym `id`.
- **`DELETE /api/rums/:id`** - Usuwa rum o podanym `id`.

#### Wina (`/api/wines`)
- **`GET /api/wines`** - Pobiera listę wszystkich win.
- **`POST /api/wines`** - Tworzy nowe wino.
- **`GET /api/wines/:id`** - Pobiera szczegóły wina o podanym `id`.
- **`PUT /api/wines/:id`** - Aktualizuje dane wina o podanym `id`.
- **`PATCH /api/wines/:id`** - Cześciowo aktualizuje dane wina o podanym `id`.
- **`DELETE /api/wines/:id`** - Usuwa wino o podanym `id`.

#### Whiskey (`/api/whiskies`)
- **`GET /api/whiskies`** - Pobiera listę wszystkich whiskey.
- **`POST /api/whiskies`** - Tworzy nową whiskey.
- **`GET /api/whiskies/:id`** - Pobiera szczegóły whiskey o podanym `id`.
- **`PUT /api/whiskies/:id`** - Aktualizuje dane whiskey o podanym `id`.
- **`PATCH /api/whiskies/:id`** - Cześciowo aktualizuje dane whiskey o podanym `id`.
- **`DELETE /api/whiskies/:id`** - Usuwa whiskey o podanym `id`.

---

### Przykłady użycia

#### Pobranie listy wódek
**Request:**
```http
GET /api/vodkas HTTP/1.1
Host: localhost:3000
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Belvedere",
    "type": "Premium",
    "abv": 40,
    "country": "Poland",
    "details": {
      "distillery": "Belvedere Distillery",
      "year": 1993,
      "awards": {
        "international": ["Gold Medal"],
        "domestic": ["Best Polish Vodka"]
      }
    }
  }
]
```

#### Stworzenie nowego rumu
**Request:**
```http
POST /api/rums HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Mount Gay XO",
  "type": "Rum",
  "abv": 43,
  "country": "Barbados",
  "details": {
    "distillery": "Mount Gay Distillery",
    "year": 1703,
    "awards": {
      "international": [1],
      "domestic": [35]
    }
  }
}
```
**Response:**
```http
HTTP/1.1 201 Created
Location: /api/rums/1

{
  "id": 1,
  "name": "Mount Gay XO",
  "type": "Rum",
  "abv": 43,
  "country": "Barbados",
  "details": {
    "distillery": "Mount Gay Distillery",
    "year": 1703,
    "awards": {
      "international": [1],
      "domestic": [35]
    }
  }
}
```

#### Cześciowa aktualizacja whiskey
**Request:**
```http
PATCH /api/whiskies/3 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "abv": 45
}
```
**Response:**
```http
HTTP/1.1 200 OK

{
  "id": 3,
  "name": "Yamazaki 12",
  "type": "Single Malt",
  "abv": 45,
  "country": "Japan",
  "details": {
    "distillery": "Suntory Yamazaki Distillery",
    "year": 1923,
    "awards": {
      "international": [1],
      "domestic": [29]
    }
  }
}
```

#### Usunięcie wina
**Request:**
```http
DELETE /api/wines/2 HTTP/1.1
Host: localhost:3000
```
**Response:**
```http
HTTP/1.1 204 No Content
```

---

### Obsługa błędów

- **`200 OK`** - Operacja zakończona sukcesem.
- **`201 Created`** - Pomyślne utworzenie zasobu.
- **`204 No Content`** - Usunięcie zasobu.
- **`400 Bad Request`** - Błędne dane wejściowe.
- **`404 Not Found`** - Zasób nie znaleziony.
- **`409 Conflict`** - Konflikt (np. duplikat zasobu).

---
