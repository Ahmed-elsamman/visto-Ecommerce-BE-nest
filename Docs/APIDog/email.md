## APIDog - Email

Base: `/email` (if exposed) or service-triggered actions.

### Send verification (service)
- Triggered on user registration; email contains link to `FRONTEND_URL_CLIENT/verifyEmail?token=...`.

### Send password reset (service)
- Triggered via `/user/forgot-password`; email contains `resetPassword?token=...`.

### Responses
- Emails are queued/sent in background; API endpoints return the unified success envelope. Errors on SMTP are mapped to unified error schema with `INTERNAL_ERROR`.


