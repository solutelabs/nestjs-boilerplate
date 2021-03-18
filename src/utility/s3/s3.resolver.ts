import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { S3Service } from './s3.service';
import { S3Dto } from './dto';
import { SignedURL } from './models';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

@Resolver()
export class S3Resolver {
  constructor(private readonly s3Service: S3Service) {}

  @Mutation(() => SignedURL)
  @UseGuards(JwtAuthGuard)
  async signedURL(
    @Args('input', { type: () => S3Dto })
    s3Dto: S3Dto,
  ) {
    const resp = await this.s3Service.getPresignedURL(s3Dto.fileName);
    return { url: resp };
  }
}
