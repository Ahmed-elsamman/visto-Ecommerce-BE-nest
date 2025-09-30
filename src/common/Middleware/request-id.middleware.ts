import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const headerId = req.headers['x-request-id'];
    const generated = headerId || `req_${randomUUID()}`;
    req.id = generated;
    res.setHeader('X-Request-Id', generated);
    next();
  }
}


