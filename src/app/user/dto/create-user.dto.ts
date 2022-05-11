import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../../core/environment';

export const characterLimitMessage = `Password length must be between ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH}`;
export const characterValidationMessage =
  'password must contain one uppercase, lowercase, number and symbol';

@ObjectType()
export class newUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password?: string;

  @Field()
  active: boolean;

  @Field()
  role: string;
}
