---
title: REST API
slug: rest
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

## Informacje dodatkowe

### Obsługa błędów
- `200 OK` - operacja zakończona sukcesem.
- `201 Created` - pomyślne utworzenie zasobu.
- `204 No Content` - usunięcie zasobu.
- `400 Bad Request` - błędne dane wejściowe.
- `404 Not Found` - zasób nie znaleziony.
- `409 Conflict` - konflikt (np. duplikat zasobu).

