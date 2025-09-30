## APIDog - Categories

Base: `/categories`

### POST /categories
- Body (CreateCategoryDto)
  - required: `name` (string)
  - optional: `description` (string)
- Response 201
```json
{ "success": true, "data": { "_id": "...", "name": "Electronics" }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### GET /categories
- Response 200
```json
{ "success": true, "data": [{ "_id": "...", "name": "Electronics" }], "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### GET /categories/:id
- Params: `id` (string)
- Response 200
```json
{ "success": true, "data": { "_id": "...", "name": "Electronics" }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### GET /categories/name/:name
- Params: `name`
- Response 200

### GET /categories/search?query=phone
- Query: `query`
- Response 200

### GET /categories/paginate?limit=10&page=1
- Query: `limit`, `page`
- Response 200
```json
{ "success": true, "data": { "items": [], "total": 0, "page": 1, "limit": 10 }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### GET /categories/count
- Response 200

### PATCH /categories/:id
- Params: `id`
- Body (UpdateCategoryDto) optional fields
- Response 200

### DELETE /categories/:id
- Params: `id`
- Response 200/204


