## Categories API

Base path: `/categories`

Headers
- Content-Type: `application/json`
- Authorization: `Bearer <token>` if your deployment protects writes (add if guarded)

### POST `/categories`
- Params: none
- Body (CreateCategoryDto):
  - required: `name: { en: string, ar: string }`
  - optional: `description?: { en?: string, ar?: string }`
- Response: Category

### GET `/categories`
- Params: none
- Response: Category[]

### GET `/categories/:id`
- Params: `id: string(ObjectId)`
- Response: Category

### GET `/categories/name/:name`
- Params: `name: string`
- Response: Category[]

### GET `/categories/search?query=...`
- Query: `query: string`
- Response: Category[]

### GET `/categories/paginate?limit=&page=`
- Query: `limit: number`, `page: number`
- Response: paginated Category[]

### GET `/categories/count`
- Response: count number

### PATCH `/categories/:id`
- Params: `id: string(ObjectId)`
- Body (UpdateCategoryDto): same shape as create, all fields optional
- Response: Category

### DELETE `/categories/:id`
- Params: `id: string(ObjectId)`
- Response: delete result

### DTOs
- `CreateCategoryDto`, `UpdateCategoryDto`


