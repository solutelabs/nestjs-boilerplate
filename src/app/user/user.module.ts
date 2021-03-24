import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { BullModule } from '@nestjs/bull';
import { QUEUE } from '@constants';
import { REDIS_QUEUE_URL } from '@environments';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE,
      redis: REDIS_QUEUE_URL,
    }),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
