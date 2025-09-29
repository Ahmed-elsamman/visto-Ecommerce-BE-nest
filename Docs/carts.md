## Carts API

Base path: `/carts`



Headers
- Authorization: `Bearer <token>`
- Content-Type: `application/json`

### PATCH `/carts/user/add-item`
- Auth: Bearer; Roles: user
- Body (AddItemDto): `productId: string(ObjectId)`, `quantity: number`
- Response: `Cart`

### PATCH `/carts/user/remove-item`
- Auth: Bearer; Roles: user
- Body: `RemoveItemDto` (contains `productId: string(ObjectId)`)
- Response: `Cart`

### GET `/carts/user`
- Auth: Bearer; Roles: user
- Response: `Cart`

### PATCH `/carts/user`
- Auth: Bearer; Roles: user
- Body: `ProductItemDto` (quantity adjustments) where `ProductItemDto` has `productId: string(ObjectId)`, `quantity: number`
- Response: `Cart`

### DELETE `/carts/user`
- Auth: Bearer
- Response: `Cart`

### DTOs
- `CreateCartDto`, `UpdateCartDto`, `AddItemDto`, `RemoveItemDto`, `ProductItemDto`


