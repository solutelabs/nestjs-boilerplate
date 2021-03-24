import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgetPasswordDto {
  @Field()
  @IsEmail()
  email: string;
}
