import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendOtpDto {
  @Field()
  mobile_number: string;

  @Field()
  country_id: string;
}
