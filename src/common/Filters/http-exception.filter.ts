import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const timestamp = new Date().toISOString();
    const requestId = request.headers['x-request-id'] || request.id || null;
    const path = request.originalUrl || request.url;
    const method = request.method;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;
      if (typeof res === 'string') {
        message = res;
      } else if (res && typeof res === 'object') {
        message = res.message || message;
        // ValidationPipe default shape { message: string[] | any, error: 'Bad Request' }
        if (Array.isArray(res.message)) {
          // Map array of messages to details without field binding
          details = {
            _errors: res.message.map((m: any) => ({
              message: typeof m === 'string' ? m : (m?.message || 'Validation error'),
              code: 'VALIDATION_ERROR_ITEM',
            })),
          };
          code = 'VALIDATION_ERROR';
        } else if (res.details) {
          details = res.details;
          code = res.code || code;
        }
      }
      // Map common statuses to codes
      if (status === HttpStatus.BAD_REQUEST && code !== 'VALIDATION_ERROR') {
        code = 'BAD_REQUEST';
      } else if (status === HttpStatus.UNAUTHORIZED) {
        code = 'AUTH_UNAUTHORIZED';
      } else if (status === HttpStatus.FORBIDDEN) {
        code = 'AUTH_FORBIDDEN';
      } else if (status === HttpStatus.NOT_FOUND) {
        code = 'RESOURCE_NOT_FOUND';
      } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
        code = 'RATE_LIMITED';
      }
    } else if (exception && typeof exception === 'object') {
      message = exception.message || message;
    }

    const body = {
      success: false,
      error: {
        code,
        message,
        details,
        timestamp,
        requestId,
        path,
        method,
      },
      meta: {
        suggestions: [],
      },
    };

    response.status(status).json(body);
  }
}


