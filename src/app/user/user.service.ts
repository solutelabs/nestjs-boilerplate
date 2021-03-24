import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserEntity } from './entities';

@Injectable()
export class UserService {
  /**
   * @author
   * @param {string} email - user 's email
   * @returns {object} UserEntity
   * @description find user by email
   */
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return getRepository(UserEntity).findOne({
      email,
    });
  }

  /**
   * @author
   * @param {string} id - user id
   * @returns {object} UserEntity
   * @description find user by id
   */
  async findById(id: string): Promise<UserEntity | undefined> {
    return getRepository(UserEntity).findOne({
      id,
    });
  }
}
