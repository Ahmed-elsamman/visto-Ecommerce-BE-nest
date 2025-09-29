## Payments API

Base path: `/payments`
Auth: Controller has `AuthenticationGuard` globally; most routes require Bearer token.

Headers
- Authorization: `Bearer <token>`
- Content-Type: `application/json`

### POST `/payments/create`
- Roles: user
- Body: `{ amount: number, currency: string, order_ID: string(ObjectId) }`
- Response: payment initiation payload (service-defined)

### POST `/payments/capture/:orderId`
- Params: `orderId: string(ObjectId)`
- Body: `{ order_ID: string(ObjectId) }`
- Response: capture result (service-defined)

### POST `/payments/refund/:paymentId`
- Roles: admin
- Body: `RefundPaymentDto`
- Response: refund result

### POST `/payments/cancel/:orderId`
- Params: `orderId: string(ObjectId)`
- Response: cancel result

### GET `/payments/status/:paymentId`
- Params: `paymentId: string(ObjectId)`
- Response: payment status for current user

### GET `/payments/history`
- Response: payment history for current user

### POST `/payments/cash-on-delivery`
- Body: `{ amount: number }`
- Response: COD payment record

### DTOs
- `RefundPaymentDto`, `CreatePaymentDto?` (service uses primitives for create)


