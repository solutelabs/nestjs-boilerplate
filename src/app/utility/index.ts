import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { getRepository } from 'typeorm';
import { UserEntity } from '../user/entities';

@Injectable()
export class UtilityService {
  async generateRandomToken(): Promise<string> {
    try {
      const token = crypto.randomBytes(16).toString('hex');
      return this.isTokenPresentInAnotherUser(token);
    } catch (error) {
      Logger.error(error);
    }
  }

  async isTokenPresentInAnotherUser(token: string): Promise<string> {
    const result = await getRepository(UserEntity).findOne({
      reset_password_token: token,
    });

    return result ? this.generateRandomToken() : token;
  }
}
