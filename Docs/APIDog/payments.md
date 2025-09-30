## APIDog - Payments

Base: `/payments`

### POST /payments/create (user)
- Body: { orderId: string, method: string }
- Response 201/200

### POST /payments/capture/:orderId (user/admin)
- Params: `orderId`
- Response 200

### POST /payments/refund/:paymentId (admin)
- Params: `paymentId`
- Response 200

### POST /payments/cancel/:orderId (user/admin)
- Params: `orderId`
- Response 200

### GET /payments/status/:paymentId
- Params: `paymentId`
- Response 200

### GET /payments/history (user)
- Response 200

### POST /payments/cash-on-delivery (user)
- Body: { orderId: string }
- Response 200


