import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class S3Dto {
  @Field()
  fileName: string;
}
