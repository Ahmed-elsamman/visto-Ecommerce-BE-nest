## Orders API

Base path: `/orders`
Auth: Controller has `AuthenticationGuard` globally; most routes require Bearer token.

Headers
- Authorization: `Bearer <token>`
- Content-Type: `application/json`

### POST `/orders/initiate`
- Body (CreateOrderDto):
  - optional (server may set): `userId?: string(ObjectId)`, `orderStatus?: OrderStatus`, `shippingAddress?: string`, `paymentId?: string(ObjectId)`
  - required: `items: ProductItemDto[]`, `totalPrice: number`
  - where `ProductItemDto` includes product id, quantity, and pricing fields
- Response: `Order`
- Notes: Server sets `userId`, placeholder `shippingAddress`, `paymentId`.

### PATCH `/orders/complete/:id`
- Params: `id: string(ObjectId)`
- Body (UpdateOrderDto): e.g., `shippingAddress?: string`, `paymentId?: string(ObjectId)`
- Response: `Order`
- Notes: Sets status to `Completed` and deletes user cart.

### GET `/orders`
- Auth: Bearer; Roles: admin
- Params: none
- Response: `Order[]`

### GET `/orders/recent`
- Auth: Bearer; Roles: admin
- Query: `limit`
- Response: `Order[]`

### GET `/orders/user`
- Params: none
- Response: current user's orders `Order[]`

### GET `/orders/:id`
- Params: `id: string(ObjectId)`
- Response: `Order`

### GET `/orders/status/:status`
- Auth: Bearer; Roles: admin
- Params: `status: OrderStatus`
- Response: `Order[]`

### PATCH `/orders/address/:id`
- Params: `id: string(ObjectId)`
- Body: `{ shippingAddress?: string }`
- Response: `Order`
- Notes: Validates ownership.

### PATCH `/orders/:id`
- Params: `id: string(ObjectId)`
- Body (UpdateOrderDto): any order fields (all optional)
- Response: `Order`
- Notes: Validates ownership.

### PATCH `/orders/status/:id`
- Auth: Bearer; Roles: admin|seller
- Params: `id: string(ObjectId)`
- Body: `{ status: OrderStatus }`
- Response: `Order`

### DELETE `/orders/:id`
- Auth: Bearer; Roles: admin|user
- Params: `id: string(ObjectId)`
- Response: `Order`
- Notes: Admin bypasses ownership; user must own order.

### PATCH `/orders/cancel/:id`
- Auth: Bearer; Roles: admin|user
- Params: `id: string(ObjectId)`
- Response: `Order`

### GET `/orders/user/cancelled`
- Auth: Bearer; Roles: user
- Params: none
- Response: `Order[]`

### GET `/orders/user/active`
- Auth: Bearer; Roles: user
- Params: none
- Response: `Order[]` (non-cancelled)

### POST `/orders/admin/create`
- Auth: Bearer; Roles: admin
- Body: `CreateOrderDto` (see initiate)
- Response: `Order`

### PATCH `/orders/admin/:id`
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`
- Body: `UpdateOrderDto`
- Response: `Order`

### GET `/orders/user/completed`
- Auth: Bearer
- Params: none
- Response: `Order[]`

### DTOs
- `CreateOrderDto`, `UpdateOrderDto`, `ProductItemDto`


