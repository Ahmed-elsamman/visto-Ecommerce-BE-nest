## APIDog - Sellers

Base: `/sellers`

### POST /sellers/register (user)
- Body: { storeName: string, phone: string, ... }
- Response 201

### PATCH /sellers/approve-seller/:id (admin)
- Params: `id`
- Response 200

### GET /sellers/status (user)
- Response 200

### GET /sellers
- Response 200

### GET /sellers/by-status/:status (admin)
- Params: `status`
- Response 200

### GET /sellers/seller (seller)
- Response 200

### GET /sellers/:id
- Params: `id`
- Response 200

### DELETE /sellers/:id (admin)
- Params: `id`
- Response 200/204

### GET /sellers/stats/overview (admin)
- Response 200

### GET /sellers/my/orders (seller)
- Response 200

### GET /sellers/my/orders/:orderId (seller)
- Params: `orderId`
- Response 200

### GET /sellers/dashboard/stats (seller)
- Response 200


