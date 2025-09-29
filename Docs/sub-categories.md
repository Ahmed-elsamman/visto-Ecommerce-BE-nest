## Sub-Categories API

Base path: `/sub-category`

Headers
- Content-Type: `application/json`
- Authorization: `Bearer <token>` if writes are protected

### POST `/sub-category`
- Body (CreateSubCategoryDto):
  - required: `categoryId: string(ObjectId)`, `name: { en: string, ar: string }`
  - optional: `description?: { en?: string, ar?: string }`
- Response: SubCategory

### GET `/sub-category`
- Query: `categoryId?`
- Response: SubCategory[]

### GET `/sub-category/:id`
- Params: `id: string(ObjectId)`
- Response: SubCategory

### PATCH `/sub-category/:id`
- Params: `id: string(ObjectId)`
- Body: `UpdateSubCategoryDto` (all optional)
- Response: SubCategory

### DELETE `/sub-category/:id`
- Params: `id: string(ObjectId)`
- Response: delete result

### GET `/sub-category/category/:categoryId`
- Params: `categoryId: string(ObjectId)`
- Response: SubCategory[]

### DTOs
- `CreateSubCategoryDto`, `UpdateSubCategoryDto`


