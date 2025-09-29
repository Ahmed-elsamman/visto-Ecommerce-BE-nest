## Users API

Base path: `/user`

Guards and roles used here: many endpoints require `AuthenticationGuard` and sometimes `AuthorizationGuard` with `@Roles(...)`.

Headers
- Authorization: `Bearer <token>` for all guarded routes
- Content-Type: `application/json` unless noted

### GET `/user` — list users
- Auth: Bearer; Roles: `user` or `admin`
- Params: none
- Query: none
- Body: none
- Response: `UpdateUserDto[]`

### GET `/user/one` — current authenticated user
- Auth: Bearer; Roles: `user` or `admin`
- Params: none
- Body: none
- Response: `UpdateUserDto`

### POST `/user/register` — create a user
- Params: none
- Body (CreateUserDto):
  - required: `name: string`, `email: string(email)`, `password: string(>=8, mixed case, number, special)`
- Response: `UpdateUserDto`

### POST `/user/verifyEmail`
- Params: none
- Body: `{ email?: string, token?: string }`
- Response:
  - `{ message: string, userData: any }`

### POST `/user/login`
- Params: none
- Body (Login):
  - required: `email: string(email)`, `password: string`
- Response: `{ token: string, email: string, userName: string }`

### POST `/user/logout`
- Auth: Bearer; Roles: user/admin
- Params: none
- Body: none
- Response: `{ message: string }`

### PATCH `/user/update/password`
- Auth: Bearer; Roles: user/admin
- Params: none
- Body: `{ oldPassword: string, newPassword: string }`
- Response: `{ message: 'Password updated successfully' }`

### DELETE `/user`
- Auth: Bearer; Roles: admin
- Params: none
- Body: none
- Response: 204 No Content

### PATCH `/user/:id` — update current user by own id
- Auth: Bearer; Roles: user/admin
- Params: `id: string(ObjectId)`
- Body (UpdateUserDto):
  - optional: user profile fields (e.g., `name?: string`, `email?: string`)
- Response: `UpdateUserDto`

### POST `/user/forgot-password`
- Params: none
- Body: `{ email: string }`
- Response: `{ message: string }`

### POST `/user/reset-password`
- Params: none
- Body: `{ token: string, newPassword: string }`
- Response: `{ message: string }`

### GET `/user/role/:role` — admin list by role
- Auth: Bearer; Roles: admin
- Params: `role: string`
- Response: `UpdateUserDto[]`

### GET `/user/:id` — admin fetch user by id
- Auth: Bearer; Roles: admin
- Params: `id: string(ObjectId)`
- Response: `UpdateUserDto`

### POST `/user/admin/create`
- Auth: Bearer; Roles: admin
- Params: none
- Body (CreateUserDto):
  - required: `name: string`, `email: string(email)`, `password: string(>=8, complexity)`
- Response: `UpdateUserDto`

### PATCH `/user/admin/update/:userId`
- Auth: Bearer; Roles: admin
- Params: `userId: string(ObjectId)`
- Body (UpdateUserDto): optional profile fields
- Response: `UpdateUserDto`

### DELETE `/user/admin/delete/:userId`
- Auth: Bearer; Roles: admin
- Params: `userId: string(ObjectId)`
- Response: `{ message: 'User deleted successfully' }`

### POST `/user/admin/login`
- Params: none
- Body (Login): `email`, `password`
- Response: `{ token: string; email: string; userName: string }`

### POST `/user/admin/reset-password`
- Params: none
- Body: `{ token: string, newPassword: string }`
- Response: `{ message: string }`

### POST `/user/admin/initiate-password-reset`
- Params: none
- Body: `{ email: string }`
- Response: informational message

### POST `/user/v2/register-website`
- Params: none
- Body (CreateUserDto): same as register
- Response: `{ token: string; user: UpdateUserDto; message: string }`

### DTOs
- `CreateUserDto`, `UpdateUserDto`, `Login` (see code for exact fields)

### Notes
- All guarded routes require `Authorization: Bearer <token>`.
- Current user id is read from `req.user.id` provided by `AuthenticationGuard`.


