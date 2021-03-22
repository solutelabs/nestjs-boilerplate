import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MutiSignedURL {
  @Field()
  key: string;

  @Field()
  url: string;
}
