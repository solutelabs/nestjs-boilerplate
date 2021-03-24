import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('0 02 * * *') // replace your time
  async cronJobMethod() {
    // your custom logic goes here
  }
}
