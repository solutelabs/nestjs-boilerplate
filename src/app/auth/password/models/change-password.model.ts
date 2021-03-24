import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangePassword {
  @Field()
  success: boolean;
}
