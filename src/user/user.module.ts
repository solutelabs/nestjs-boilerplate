import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { BullModule } from '@nestjs/bull';
import { QUEUE } from '../constant';
import { REDIS_QUEUE_URL } from '../environment';

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
