import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ValidateOtpDto {
  @Field()
  mobile_number: string;

  @Field()
  otp: string;
}
