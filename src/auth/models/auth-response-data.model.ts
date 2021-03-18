import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseData {
  @Field()
  user_id: string;

  @Field()
  role: string;
}
