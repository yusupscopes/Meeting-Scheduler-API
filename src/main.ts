import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
