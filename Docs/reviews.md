## Reviews API

Base path: `/reviews`

Headers
- Authorization: `Bearer <token>` for write endpoints
- Content-Type: `application/json`

### POST `/reviews`
- Auth: Bearer
- Body (CreateReviewDto):
  - required: `productId: string(ObjectId)`, `rating: number`, `reviewText: string`
  - optional (server may set): `userId?: string(ObjectId)`
- Response: `Review`

### GET `/reviews/user`
- Auth: Bearer
- Response: `Review[]`

### GET `/reviews/product/:productId`
- Params: `productId: string(ObjectId)`
- Response: `Review[]`

### GET `/reviews/:id`
- Params: `id: string(ObjectId)`
- Response: `Review`

### PATCH `/reviews/:id`
- Auth: Bearer
- Params: `id: string(ObjectId)`
- Body (UpdateReviewDto): optional: `rating?: number`, `reviewText?: string`
- Response: `Review`

### DELETE `/reviews/:id`
- Auth: Bearer
- Params: `id: string(ObjectId)`
- Response: `Review`

### DTOs
- `CreateReviewDto`, `UpdateReviewDto`


