import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForgetPasswordModel {
  @Field()
  email: string;
}
