import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    // Future domain modules go here: AuthModule, UserModule, etc.
  ],
  controllers: [UsersController],
})
export class AppModule {}
