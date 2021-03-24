import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '@environments';
import { UserService } from './../../user/user.service';
import { IPayload } from '../interface';
import { UserEntity } from './../../user/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: IPayload): Promise<UserEntity> {
    const user = await this.userService.findById(
      payload['https://hasura.io/jwt/claims']['x-hasura-user-id'],
    );

    if (!user || !user.active) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
