import { Field, ObjectType } from '@nestjs/graphql';
import { AuthResponseData } from './auth-response-data.model';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;
  @Field(() => AuthResponseData)
  data: AuthResponseData;
}
