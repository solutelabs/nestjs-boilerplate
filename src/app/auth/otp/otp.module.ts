import { Module } from '@nestjs/common';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities';
import { CountryModule } from '../../country/country.module';
import { OtpEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity, UserEntity]), CountryModule],
  providers: [OtpResolver, OtpService],
  exports: [OtpService],
})
export class OtpModule {}
