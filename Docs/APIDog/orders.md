## APIDog - Orders

### POST /orders/initiate (user)
- Body: CreateOrderDto
```json
{ "products": [{"productId": "...", "quantity": 1}] }
```
- Response 201/200
```json
{ "success": true, "data": { "_id": "...", "orderStatus": "Pending" }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### PATCH /orders/complete/:id (user)
- Body: UpdateOrderDto
```json
{ "shippingAddress": "...", "paymentId": "..." }
```
- Response 200
```json
{ "success": true, "data": { "_id": "...", "orderStatus": "Completed" }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### GET /orders (admin)
- Response 200
```json
{ "success": true, "data": [ { "_id": "..." } ], "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### Error example: forbidden
```json
{
  "success": false,
  "error": {
    "code": "AUTH_FORBIDDEN",
    "message": "Forbidden resource",
    "timestamp": "2025-09-30T12:00:00.000Z",
    "requestId": "req_...",
    "path": "/orders",
    "method": "GET"
  },
  "meta": { "suggestions": [] }
}
```


