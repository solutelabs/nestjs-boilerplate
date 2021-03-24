import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENVIRONMENT, PORT, SENTRY_DSN } from '@environments';
import { ValidationPipe } from '@nestjs/common';
import { Logger, SentryInterceptor } from '@utility';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  Sentry.init({
    dsn: SENTRY_DSN,
    enabled: ENVIRONMENT === 'production',
  });
  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen(PORT || 3000);
  Logger.debug(`🚀  Server is listening on port ${PORT}`);
}

// Start Application
bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`);
  throw e;
});
