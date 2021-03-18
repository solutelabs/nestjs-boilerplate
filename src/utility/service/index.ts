import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserEntity } from '../../user/entities';
import { getRepository } from 'typeorm';

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
