## APIDog - Users

### GET /user
- Auth: Bearer (roles: user, admin)
- Response 200
```json
{
  "success": true,
  "data": [
    { "_id": "...", "email": "...", "role": "user" }
  ],
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### GET /user/one (Me)
- Auth: Bearer (roles: user, admin)
- Response 200
```json
{
  "success": true,
  "data": { "_id": "...", "email": "...", "role": "user" },
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### POST /user/register
- Body: CreateUserDto
  - required: `email` (string, email), `password` (string, strong), `userName` (string)
  - optional: `phone`, `address`
```json
{ "email": "user@example.com", "password": "P@ssw0rd", "userName": "John" }
```
- Response 201
```json
{
  "success": true,
  "data": { "_id": "...", "email": "user@example.com", "userName": "John" },
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### POST /user/login
- Body
```json
{ "email": "user@example.com", "password": "P@ssw0rd" }
```
### PATCH /user/update/password
- Auth: Bearer (user|admin)
- Body: { oldPassword: string, newPassword: string }
- Response 200
```json
{ "success": true, "data": { "message": "Password updated successfully" }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### Admin section
- GET `/user/role/:role`
- GET `/user/:id`
- POST `/user/admin/create`
- PATCH `/user/admin/update/:userId`
- DELETE `/user/admin/delete/:userId`
- POST `/user/admin/login`
- POST `/user/admin/reset-password`
- POST `/user/admin/initiate-password-reset`

- Response 200
```json
{
  "success": true,
  "data": { "token": "jwt", "email": "user@example.com", "userName": "John" },
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." }
}
```

### Errors (schema applies to all endpoints)
- Example: Validation error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": [
        { "message": "email must be an email", "code": "VALIDATION_ERROR_ITEM", "value": "bad" }
      ]
    },
    "timestamp": "2025-09-30T12:00:00.000Z",
    "requestId": "req_...",
    "path": "/user/register",
    "method": "POST"
  },
  "meta": { "suggestions": [] }
}
```


