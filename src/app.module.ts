import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomExceptionsFilter } from './utility';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService, GraphqlService } from './config';
import { AppResolver } from './app.resolver';
import { ScheduleModule } from '@nestjs/schedule';
import { S3Module } from './utility/s3/s3.module';
import { OtpModule } from './otp/otp.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    TerminusModule,
    AuthModule,
    UserModule,
    S3Module,
    OtpModule,
    CountryModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        exceptionFactory: (error: ValidationError[]) =>
          new BadRequestException(error),
      }),
    },
    AppResolver,
  ],
})
export class AppModule {}
