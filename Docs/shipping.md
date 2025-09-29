## Shipping API

Base path: `/shipping`
Auth: Controller has `AuthenticationGuard` globally; Bearer token required.

Headers
- Authorization: `Bearer <token>`
- Content-Type: `application/json`

### POST `/shipping`
- Body (CreateShippingDto):
  - required: `address: string`
  - optional: `trackingNumber?: string`, `isActive?: boolean`, `orderId?: string(ObjectId)`
- Response: `Shipping`

### GET `/shipping`
- Response: `Shipping[]` (all addresses of current user)

### GET `/shipping/lastAddresses/`
- Response: recent `Shipping[]`

### PUT `/shipping/address/:id`
- Params: `id: string(ObjectId)`
- Body (UpdateShippingDto): `address: string`
- Response: `Shipping`

### GET `/shipping/activeAddress`
- Response: `Shipping`

### GET `/shipping/:id`
- Params: `id: string(ObjectId)`
- Response: `Shipping`

### PUT `/shipping/deactivate/:id`
- Params: `id: string(ObjectId)`
- Response: void

### PUT `/shipping/activate/:id`
- Params: `id: string(ObjectId)`
- Response: void

### GET `/shipping/status/:id`
- Params: `id: string(ObjectId)`
- Response: string status

### DTOs
- `CreateShippingDto`, `UpdateShippingDto`


