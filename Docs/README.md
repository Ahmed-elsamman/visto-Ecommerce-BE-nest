## Vesto API Documentation

This Docs directory describes all modules, endpoints, request/response contracts, auth/roles, and best practices to use the API.

### Base URL
- Local: `http://localhost:3000`

### Authentication & Authorization
- Auth is sessionless using JWT.
- Include the JWT as an `Authorization: Bearer <token>` header for guarded endpoints.
- Guards/roles used across controllers:
  - `AuthenticationGuard`: requires a valid JWT.
  - `AuthorizationGuard` + `@Roles(...)`: restricts role(s) for the route.
  - Common roles: `user`, `seller`, `admin`.

### Conventions
- Content-Type: `application/json` unless file upload.
- Timestamps and IDs are MongoDB ObjectIds as strings.
- Errors follow the unified schema:
  - `{ "success": false, "error": { code, message, details, timestamp, requestId, path, method }, "meta": { suggestions: [] } }`

### Pagination & Filtering
- Pagination: `page`, `limit`
- Sorting: `sortBy`, `order` (asc|desc)
- Filtering: various query params per module; products also supports advanced JSON query params.

### Modules
- See module docs:
  - `users.md`
  - `products.md`
  - `orders.md`
  - `payments.md`
  - `carts.md`
  - `categories.md`
  - `sub-categories.md`
  - `reviews.md`
  - `sellers.md`
  - `shipping.md`
  - `cloudinary.md`
  - `email.md`

### Quickstart (Best Way to Use Project)
1) Install & run
```
npm install
npm run start:dev
```
2) Register and login a user
   - POST `/user/register` with minimal fields required by CreateUserDto.
   - POST `/user/login` to obtain JWT.
3) Set `Authorization: Bearer <token>` for subsequent requests.
4) As a normal user:
   - Manage cart under `/carts/user/*`.
   - Create shipping addresses under `/shipping/*`.
   - Initiate order `/orders/initiate` then complete `/orders/complete/:id`.
   - Pay via `/payments/*`.
   - Leave reviews under `/reviews/*` for delivered items.
5) To sell products:
   - Register seller `/sellers/register` (role user required).
   - Admin approves `/sellers/approve-seller/:id`.
   - Seller can manage products `/products` and view seller dashboards.
6) Admin flows:
   - Manage users `/user/admin/*` and `/user/:id`.
   - Manage products `/products` verify/stock endpoints.
   - Manage sellers `/sellers/*`, orders `/orders/*`, payments `/payments/refund/*`.

### Notes
- Some services expect valid Mongo ObjectIds; many endpoints validate with `Types.ObjectId.isValid`.
- Image upload uses `multipart/form-data` per `cloudinary` and `products/:id/images` endpoints.
- Always check role requirements in each module doc.

### Error Examples
```json
{
  "statusCode": 400,
  "message": "Invalid product ID",
  "error": "Bad Request"
}
```

```json
{
  "message": "Password updated successfully"
}
```


