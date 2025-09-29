## Products API

Base path: `/products`

Headers
- Content-Type: `application/json` unless noted
- Authorization: `Bearer <token>` for seller/admin routes

### GET `/products/sort`
- Query: `sortBy`, `order` (asc|desc)
- Response: `Product[]`

### GET `/products/pagination`
- Query: `page`, `limit`
- Response: `{ products: Product[]; totalCount: number }`

### GET `/products/filter`
- Query: arbitrary key/value filters
- Response: `Product[]`

### GET `/products/filterCatName`
- Query: `subcategoryId?`, `name?`
- Errors: 400 if both missing
- Response: `Product[]`

### GET `/products/advanced-filter`
- Query (as JSON strings):
  - `filters`: JSON object
  - `pagination`: `{ page: number, limit: number }`
  - `sorting`: `{ sortBy: string, order: 'asc'|'desc' }`
- Errors: 400 on invalid JSON
- Response: `{ products: Product[]; totalCount: number }`

### GET `/products/search`
- Query: `query`
- Response: `Product[]`

### GET `/products/completed-orders-reviews`
- Response: `{ productId: string; reviews: any[] }[]`

### GET `/products/category/:subcategoryId`
- Response: `Product[]`

### GET `/products/seller/products`
- Auth: Bearer; Roles: seller|admin
- Query: `page` (default 1), `limit` (default 10)
- Response: `{ products: Product[]; totalCount: number }`

### GET `/products/highlighted-reviews/:id`
- Response: `Product`

### GET `/products`
- Response: `Product[]`

### GET `/products/filtered`
- Query: `categoryId?`, `brand?`, `minPrice?`, `maxPrice?`, `sortBy?` (price|name, default price), `sortOrder?` (asc|desc, default desc), `page?`, `limit?`
- Response: `{ products: Product[]; totalCount: number }`

### PUT `/products/verify-all`
- Response: `{ modifiedCount: number }`

### GET `/products/:id`
- Response: `Product`

### POST `/products`
- Auth: Bearer; Roles: admin|seller
- Body (CreateProductDto):
  - required: `subcategoryId: string(ObjectId)`, `name: { en: string, ar: string }`, `price: number`, `imageUrls: string[]`, `stock: number`
  - optional: `reviews?: string[]`, `discounts?: number`, `description?: { en?: string, ar?: string }`, `brand?: string`, `isVerified?: boolean`
- Response: `Product`

### PUT `/products/:id`
- Auth: Bearer; Roles: seller|admin
- Params: `id: string(ObjectId)`
- Body (UpdateProductDto): same as create, all optional
- Response: `Product`

### DELETE `/products/:id`
- Auth: Bearer; Roles: admin|seller
- Params: `id: string(ObjectId)`
- Response: void

### POST `/products/:id/reviews`
- Auth: Bearer; Roles: user
- Params: `id: string(ObjectId)`
- Body: `{ reviewId: string(ObjectId) }`
- Response: `Product`

### DELETE `/products/:id/reviews/:reviewId`
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`, `reviewId: string(ObjectId)`
- Response: `Product`

### POST `/products/:id/images`
- Auth: Bearer; Roles: admin|seller
- Content-Type: `multipart/form-data` with field `image`
- Params: `id: string(ObjectId)`
- Response: `Product`

### DELETE `/products/:id/images`
- Auth: Bearer; Roles: admin|seller
- Params: `id: string(ObjectId)`
- Body: `{ imageUrl: string }`
- Response: `Product`

### PUT `/products/:id/stock`
- Auth: Bearer; Roles: admin|seller
- Params: `id: string(ObjectId)`
- Body: `{ stock: number }`
- Response: `Product`

### PUT `/products/:id/verify`
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`
- Body: `{ isVerified: boolean }`
- Response: `Product`

### GET `/products/:id/reviews`
- Params: `id: string(ObjectId)`
- Response: any

### GET `/products/:id/average-rating`
- Params: `id: string(ObjectId)`
- Response: `{ averageRating: number; totalReviews: number }`

### GET `/products/brands`
- Response: any

### DTOs
- `CreateProductDto`, `UpdateProductDto`

### Notes
- Product, Review are MongoDB-based schemas; ids are ObjectIds.
- File upload integrates with Cloudinary service.


