## APIDog Conventions (Vesto)

- Base URL: `http://localhost:3000`
- Auth Header (if required): `Authorization: Bearer <jwt>`
- Rate limit: 10 requests / 5s (429 uses unified error schema)
- Success schema
```json
{
  "success": true,
  "data": {},
  "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_x" }
}
```
- Error schema
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {},
    "timestamp": "2025-09-30T12:00:00.000Z",
    "requestId": "req_x",
    "path": "/path",
    "method": "GET"
  },
  "meta": { "suggestions": [] }
}
```


