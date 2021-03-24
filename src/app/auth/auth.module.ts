import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET, JWT_EXPIRES_IN_DAYS } from '@environments';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy';
import { OtpModule } from './otp/otp.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      verifyOptions: {
        algorithms: ['HS256'],
      },
      signOptions: { expiresIn: `${JWT_EXPIRES_IN_DAYS}d` },
    }),
    PasswordModule,
    OtpModule,
    UserModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
