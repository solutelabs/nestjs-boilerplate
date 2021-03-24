import { InputType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class MultiS3Dto {
  @Field(() => [String])
  @IsArray()
  fileNames: string[];
}
