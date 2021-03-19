import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlThrottlerGuard } from '../utility/guards';
import { ValidateOtpDto, SendOtpDto } from './dto';
import { UserOtpResponse } from './models';
import { OtpService } from './otp.service';

@Resolver()
export class OtpResolver {
  constructor(private otpService: OtpService) {}

  @Mutation(() => UserOtpResponse)
  async verifyOtp(
    @Args('input', { type: () => ValidateOtpDto }) validateOtp: ValidateOtpDto,
  ) {
    return this.otpService.verifyOtp(
      validateOtp.mobile_number,
      validateOtp.otp,
    );
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation(() => UserOtpResponse)
  async sendOtp(@Args('input', { type: () => SendOtpDto }) data: SendOtpDto) {
    return this.otpService.createAndSendOtp(data);
  }
}
