## APIDog - Reviews

Base: `/reviews`

### POST /reviews (user)
- Body: { productId: string, rating: number (1-5), comment?: string }
- Response 201

### GET /reviews/user (user)
- Response 200

### GET /reviews/product/:productId
- Params: `productId`
- Response 200

### GET /reviews/:id
- Params: `id`
- Response 200

### PATCH /reviews/:id (user/admin per rules)
- Body: { rating?: number, comment?: string }
- Response 200

### DELETE /reviews/:id (admin)
- Response 200/204


