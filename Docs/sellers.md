## Sellers API

Base path: `/sellers`

Headers
- Authorization: `Bearer <token>`
- Content-Type: `application/json`

### POST `/sellers/register`
- Auth: Bearer; Roles: user
- Body (CreateSellerDto) required unless noted:
  - businessName: string (3-30)
  - businessNameArabic: string (2-40)
  - registrationNumber: string
  - country: string
  - addressLine: string
  - governorate: string
  - phoneNumber: string (E.164)
  - fullName: string
  - countryOfCitizenship: string
  - countryOfBirth: string
  - dateOfBirth: Date (ISO)
  - identityProof: 'National ID' | 'Passport'
  - countryOfIssue: string
  - nationalIdOrPassport: string
  - cardNumber: string
  - expirationDate: Date (ISO)
  - optional: `cardHolderName?: string`
- Response: `Seller` (status `pending`)

### PATCH `/sellers/approve-seller/:id`
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`
- Body: `{ status: 'approved'|'rejected' }`
- Response: updated seller

### GET `/sellers/status`
- Auth: Bearer
- Params: none
- Response: seller status for current user

### GET `/sellers`
- Auth: Bearer; Roles: admin
- Params: none
- Response: `Seller[]`

### GET `/sellers/by-status/:status`
- Auth: Bearer; Roles: admin
- Params: `status: 'pending'|'approved'|'rejected'`
- Response: `Seller[]`

### GET `/sellers/seller`
- Auth: Bearer; Roles: seller
- Params: none
- Response: `Seller` for current user

### GET `/sellers/:id`
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`
- Response: `Seller`

### DELETE `/sellers/:id`
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`
- Response: void

### GET `/sellers/stats/overview`
- Auth: Bearer; Roles: admin
- Params: none
- Response: aggregated stats

### GET `/sellers/my/orders`
- Auth: Bearer; Roles: seller
- Params: none
- Response: orders belonging to seller

### GET `/sellers/my/orders/:orderId`
- Auth: Bearer; Roles: seller
- Params: `orderId: string(ObjectId)`
- Response: order details for seller

### GET `/sellers/dashboard/stats`
- Auth: Bearer; Roles: seller
- Params: none
- Response: dashboard KPIs

### DTOs
- `CreateSellerDto`, `UpdateSellerDto`


