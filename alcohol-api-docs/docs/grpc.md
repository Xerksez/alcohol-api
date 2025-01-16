---
title: gRPC API
slug: grpc
---

## gRPC API

gRPC API obsługuje dane dotyczące wódek. Endpoint serwera znajduje się pod adresem:

[127.0.0.1:9090](http://127.0.0.1:9090)

---

### Definicja protokołu

#### Protokół `.proto`

```proto
syntax = "proto3";

package monopolowy;

service VodkaService {
    rpc ListVodkas(VodkaFilter) returns (VodkaListResponse);
    rpc GetVodka(VodkaId) returns (VodkaResponse);
    rpc CreateVodka(Vodka) returns (Vodka);
    rpc UpdateVodka(Vodka) returns (Vodka);
    rpc DeleteVodka(VodkaId) returns (Empty);
}

message Vodka {
    int32 id = 1;
    string name = 2;
    string type = 3;
    int32 abv = 4;
    string country = 5;
    VodkaDetails details = 6;
}

message VodkaDetails {
    string distillery = 1;
    int32 year = 2;
}

message VodkaFilter {
    string name = 1;
    int32 min_abv = 2;
    int32 max_abv = 3;
    string country = 4;
}

message VodkaListResponse {
    repeated Vodka vodkas = 1;
}

message VodkaResponse {
    Vodka vodka = 1;
}

message VodkaId {
    int32 id = 1;
}

message Empty {}
```

---

### Funkcjonalności serwisu

#### Metody dostępne w serwisie
- **`ListVodkas`**: Zwraca listę wszystkich wódek zgodnych z filtrem.
- **`GetVodka`**: Zwraca szczegóły jednej wódki według ID.
- **`CreateVodka`**: Tworzy nową wódkę.
- **`UpdateVodka`**: Aktualizuje istniejącą wódkę.
- **`DeleteVodka`**: Usuwa wódkę według ID.

---

### Uruchamianie serwera
Aby uruchomić serwer gRPC, wykonaj następujące polecenie:
```bash
npm run startGrpc
```

---

### Przykłady użycia

#### Pobranie listy wódek
**Request:**
```json
{
  "name": "Belvedere",
  "min_abv": 40
}
```
**Response:**
```json
{
  "vodkas": [
    {
      "id": 1,
      "name": "Belvedere",
      "type": "Premium",
      "abv": 40,
      "country": "Poland",
      "details": {
        "distillery": "Belvedere Distillery",
        "year": 1993
      }
    }
  ]
}
```

#### Stworzenie nowej wódki
**Request:**
```json
{
  "name": "Luxury Vodka",
  "type": "Premium",
  "abv": 42,
  "country": "France",
  "details": {
    "distillery": "Luxury Distillery",
    "year": 2023
  }
}
```
**Response:**
```json
{
  "id": 2,
  "name": "Luxury Vodka",
  "type": "Premium",
  "abv": 42,
  "country": "France",
  "details": {
    "distillery": "Luxury Distillery",
    "year": 2023
  }
}
```

#### Pobranie szczegółów wódki po ID
**Request:**
```json
{
  "id": 1
}
```
**Response:**
```json
{
  "vodka": {
    "id": 1,
    "name": "Belvedere",
    "type": "Premium",
    "abv": 40,
    "country": "Poland",
    "details": {
      "distillery": "Belvedere Distillery",
      "year": 1993
    }
  }
}
```

---

### Obsługa błędów

- **`NOT_FOUND`**: Gdy zasób o podanym ID nie istnieje.
- **`INVALID_ARGUMENT`**: Gdy dane wejściowe są niepoprawne.
- **`INTERNAL`**: Gdy wystąpi nieznany błąd serwera.

---

### Testowanie klienta
Aby przetestować klienta gRPC:
1. **Uruchom serwer gRPC:**
   ```bash
   npm run startGrpc
   ```
2. **Uruchom klienta:**
   ```bash
   node client.js
   
