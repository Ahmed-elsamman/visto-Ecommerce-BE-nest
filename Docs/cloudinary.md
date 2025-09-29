## Cloudinary Upload API

Base path: `/upload`

### POST `/upload/image`
- Auth: Bearer; Roles: admin|seller
- Content-Type: `multipart/form-data`
- Field: `file` (image)
- Response: `{ url: string }`

### Notes
- Used by products image upload as well (`/products/:id/images`).


