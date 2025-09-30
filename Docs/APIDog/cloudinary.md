## APIDog - Upload (Cloudinary)

Base: `/upload`

### POST /upload/image (admin|seller|user per guard)
- FormData: `image` (jpeg/png/webp ≤5MB)
- Headers: Authorization Bearer <jwt>
- Response 200
```json
{ "success": true, "data": { "url": "https://..." }, "meta": { "timestamp": "2025-09-30T12:00:00.000Z", "requestId": "req_..." } }
```

### Error example (rate limited)
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests, You have exceeded the allowed number of requests. Please try again shortly",
    "details": { "retryAfter": "5s", "limit": 10, "remaining": 0 },
    "timestamp": "2025-09-30T12:00:00.000Z",
    "requestId": "req_...",
    "path": "/upload/image",
    "method": "POST"
  },
  "meta": { "suggestions": ["Reduce request frequency", "Consider client-side caching"] }
}
```


