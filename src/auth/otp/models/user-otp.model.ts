import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserOtpResponse {
  @Field()
  id?: string;

  @Field({ nullable: true })
  otp_secret?: string;

  @Field()
  mobile_number: string;

  @Field()
  created_at?: Date;

  @Field()
  updated_at?: Date;
}
