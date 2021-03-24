import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CountryResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;
}
