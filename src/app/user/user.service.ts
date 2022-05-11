import { BadRequestException, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { newUser } from './dto/create-user.dto';
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
    const user = await getRepository(UserEntity).findOne({
      email,
    });
    console.log(user);
    return user;
  }

  /**
   * @author
   * @param {string} id - user id
   * @returns {object} UserEntity
   * @description find user by id
   */
  async findById(id: string): Promise<UserEntity | undefined> {
    const user = getRepository(UserEntity).findOne({
      id,
    });
    console.log(user);
    return user;
  }

  async createUser(data: newUser) {
    const user = getRepository(UserEntity).create(data);

    try {
      getRepository(UserEntity).save(data);
      console.log(user);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return user;
  }
}
