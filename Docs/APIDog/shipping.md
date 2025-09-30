## APIDog - Shipping

Base: `/shipping`

### POST /shipping (user)
- Body: { address: string, city: string, country: string, isActive?: boolean }
- Response 201

### GET /shipping
- Response 200

### GET /shipping/lastAddresses/
- Response 200

### PUT /shipping/address/:id
- Params: `id`
- Body: { address?: string, city?: string, country?: string }
- Response 200

### GET /shipping/activeAddress
- Response 200

### GET /shipping/:id
- Params: `id`
- Response 200

### PUT /shipping/deactivate/:id
- Params: `id`
- Response 200

### PUT /shipping/activate/:id
- Params: `id`
- Response 200

### GET /shipping/status/:id
- Params: `id`
- Response 200


