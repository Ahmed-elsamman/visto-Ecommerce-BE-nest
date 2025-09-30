## APIDog - Carts

Includes endpoints under `/carts` for authenticated users.

### Headers
- Authorization: Bearer <jwt>

### PATCH /carts/user/add-item
- Role: user
- Body (AddItemDto)
  - required: `productId` (string ObjectId), `quantity` (number ≥1)
  - optional: none
- Response 200
```json
{ "success": true, "data": { "_id": "...", "items": [{"productId":"...","quantity":2}] }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```
- Error 400
```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Validation failed", "details": { "productId": [{"message":"must be a valid id","code":"VALIDATION_ERROR_ITEM","value":"bad"}] }, "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_...", "path": "/carts/user/add-item", "method": "PATCH" }, "meta": { "suggestions": [] } }
```

### PATCH /carts/user/remove-item
- Role: user
- Body (RemoveItemDto)
  - required: `productId` (string ObjectId)
- Response 200
```json
{ "success": true, "data": { "_id": "...", "items": [] }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### GET /carts/user
- Role: user
- Response 200
```json
{ "success": true, "data": { "_id": "...", "items": [] }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### PATCH /carts/user
- Role: user
- Body (ProductItemDto)
  - required: `productId` (string), `quantity` (number)
- Response 200
```json
{ "success": true, "data": { "_id": "...", "items": [{"productId":"...","quantity":3}] }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### DELETE /carts/user
- Role: user
- Response 200
```json
{ "success": true, "data": { "_id": "...", "deleted": true }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```


