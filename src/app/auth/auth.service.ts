import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayload, IAuthResponse } from './interface';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto';
import { UserEntity } from './../user/entities';
import { compareHash } from '../../core/utility/bcrypt';
import { ERROR_CODES } from '../../core/error-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @author
   * @param {object} data - LoginDto
   * @returns {object} IAuthResponse
   * @description Authenticate user
   */
  async login(data: LoginDto): Promise<IAuthResponse> {
    const user: UserEntity = await this.validateUser(data.email, data.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.active) {
      throw new UnauthorizedException(
        'You are not authorized to access',
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    const payload = this.generatePayload(user.id, user.role);

    return {
      accessToken: this.jwtService.sign(payload),
      data: {
        user_id: user.id,
        role: user.role,
      },
    };
  }

  /**
   * @author
   * @param {string} userId - user_id of user
   * @param {string} role - role of user
   * @param {string} schoolId - optional school_id of user
   * @returns {object} IPayload
   * @description generate jwt payload for user
   */
  generatePayload(userId: string, role: string): IPayload {
    return {
      'https://hasura.io/jwt/claims': {
        'x-hasura-role': role,
        'x-hasura-user-id': userId,
        'x-hasura-allowed-roles': [role],
        'x-hasura-default-role': role,
      },
    };
  }

  /**
   * @author
   * @param {string} email
   * @param {string} password
   * @returns {object} UserEntity
   * @description checks if the user exists with email and password
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (!user.password) {
      throw new BadRequestException('Please setup your account');
    }
    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        'Incorrect password',
        ERROR_CODES.INCORRECT_PASSWORD,
      );
    }

    return user ? user : null;
  }
}
