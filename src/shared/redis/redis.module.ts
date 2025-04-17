import { Module } from '@nestjs/common';
import { BullModule, BullRootModuleOptions } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    } as BullRootModuleOptions),
  ],
})
export class RedisModule {}
