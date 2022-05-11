import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  ChangePassword,
  ForgetPasswordModel,
  ResetPasswordResponse,
} from './models';
import { ChangePasswordDto, ForgetPasswordDto, ResetPasswordDto } from './dto';
import { PasswordService } from './password.service';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './../../user/entities';
import {
  IChangePasswordResponse,
  IForgetPasswordResponse,
  IResetPasswordResponse,
} from './interface';
import { User, JwtAuthGuard } from '../../../core/utility';

@Resolver()
export class PasswordResolver {
  constructor(private readonly passwordService: PasswordService) {}

  @Mutation(() => ChangePassword)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Args('input', { type: () => ChangePasswordDto })
    data: ChangePasswordDto,
    @User() user: UserEntity,
  ): Promise<IChangePasswordResponse | undefined> {
    return this.passwordService.changePassword(data, user);
  }

  @Mutation(() => ForgetPasswordModel)
  async forgetPassword(
    @Args('input', { type: () => ForgetPasswordDto })
    data: ForgetPasswordDto,
  ): Promise<IForgetPasswordResponse | undefined> {
    return this.passwordService.forgetPassword(data);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('input', { type: () => ResetPasswordDto })
    data: ResetPasswordDto,
  ): Promise<IResetPasswordResponse> {
    return this.passwordService.resetPassword(data);
  }
}
