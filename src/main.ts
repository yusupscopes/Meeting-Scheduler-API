import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/utils/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Auto validation at application level
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
