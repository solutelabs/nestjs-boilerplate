import { Field, ObjectType } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';
import {
  characterLimitMessage,
  characterValidationMessage,
} from './../../../auth/dto';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from './../../../environment';

@ObjectType()
export class ResetPasswordModel {
  @Field()
  token: string;

  @Field()
  @Field()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: characterLimitMessage,
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s)/, {
    message: characterValidationMessage,
  })
  newPassword: string;
}
