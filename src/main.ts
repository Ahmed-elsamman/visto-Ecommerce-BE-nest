import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { HttpExceptionFilter } from './common/Filters/http-exception.filter';
import { ResponseInterceptor } from './common/Interceptors/response.interceptor';
import { RequestIdMiddleware } from './common/Middleware/request-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const details: Record<string, any[]> = {};
        for (const err of validationErrors as any[]) {
          const field = err.property || '_';
          details[field] = (err.constraints
            ? Object.values(err.constraints)
            : ['Validation error']
          ).map((message: string) => ({
            message,
            code: 'VALIDATION_ERROR_ITEM',
            value: err.value,
          }));
        }
        return new BadRequestException({
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details,
        });
      },
    }),
  );
  app.use(new RequestIdMiddleware().use);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalGuards(new RateLimiterGuard());
  // ... existing code ...
  app.useGlobalGuards(
    new RateLimiterGuard(
      {
        for: 'Express',
        type: 'Memory',
        points: 10,
        duration: 5,
        errorMessage: 'Too many requests',
        customResponseSchema: (rateLimiterResponse) => ({
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message:
              'Too many requests, You have exceeded the allowed number of requests. Please try again shortly',
            details: {
              retryAfter: `${Math.round(rateLimiterResponse.msBeforeNext / 1000)}s`,
              limit: 10,
              remaining: rateLimiterResponse.remainingPoints,
            },
            timestamp: new Date().toISOString(),
            requestId: null,
            path: undefined,
            method: undefined,
          },
          meta: {
            suggestions: ['Reduce request frequency', 'Consider client-side caching'],
          },
        }),
      },
      new Reflector(),
    ),
  );
  // ... existing code ...

  // app.useGlobalFilters(new HttpExceptionFilter());
  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vesto API')
    .setDescription('API documentation for the Vesto project')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        name: 'Authorization',
        in: 'header',
      },
      'bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-flattop.css',
  });

  await app.listen(3000);
}
bootstrap();
