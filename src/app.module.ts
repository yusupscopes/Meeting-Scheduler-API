import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    // Future domain modules go here: AuthModule, UserModule, etc.
  ],
})
export class AppModule {}
