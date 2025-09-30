## APIDog - Products

### GET /products
- Response 200
```json
{
  "success": true,
  "data": [ { "_id": "...", "name": "Item" } ],
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### GET /products/pagination?page=1&limit=10
- Response 200
```json
{
  "success": true,
  "data": { "products": [ { "_id": "..." } ], "totalCount": 25 },
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### POST /products (admin|seller)
- Body: CreateProductDto
```json
{ "name": "Phone", "price": 1000, "brand": "XYZ" }
```
- Response 201
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Phone", "price": 1000 },
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### POST /products/:id/images (admin|seller)
- FormData: image (jpeg/png/webp, ≤5MB)
- Response 200
```json
{ "success": true, "data": { "_id": "...", "images": ["url"] }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### Error example: invalid image
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid image type",
    "timestamp": "2025-09-30T12:00:00.000Z",
    "requestId": "req_...",
    "path": "/products/123/images",
    "method": "POST"
  },
  "meta": { "suggestions": ["Upload jpeg/png/webp under 5MB"] }
}
```


