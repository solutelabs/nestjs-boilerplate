import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '@environments';

export const characterLimitMessage = `Password length must be between ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH}`;
export const characterValidationMessage =
  'password must contain one uppercase, lowercase, number and symbol';

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
