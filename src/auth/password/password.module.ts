import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordResolver } from './password.resolver';
import { UserModule } from './../../user/user.module';
import { UtilityService } from '../../utility';

@Module({
  imports: [UserModule],
  providers: [PasswordService, PasswordResolver, UtilityService],
})
export class PasswordModule {}
