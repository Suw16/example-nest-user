import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './common/request/bad-request';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(3000);
}
bootstrap();
