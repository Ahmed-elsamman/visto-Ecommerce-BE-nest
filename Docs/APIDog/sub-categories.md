## APIDog - Sub-categories

Base: `/sub-category`

### POST /sub-category
- Body: { name: string, categoryId: string }
- Response 201

### GET /sub-category
- Response 200

### GET /sub-category/:id
- Params: `id`
- Response 200

### PATCH /sub-category/:id
- Params: `id`
- Body: { name?: string, categoryId?: string }
- Response 200

### DELETE /sub-category/:id
- Params: `id`
- Response 200/204

### GET /sub-category/category/:categoryId
- Params: `categoryId`
- Response 200


