import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './app/auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlService } from '@config';
import { AppResolver } from './app.resolver';
import { ScheduleModule } from '@nestjs/schedule';
import { S3Module } from './app/s3/s3.module';
import { CronService, CustomExceptionsFilter } from '@utility';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './app/user/user.module';
import { CountryModule } from './app/country/country.module';
import * as ormconfig from './core/config/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlService,
    }),
    TerminusModule,
    AuthModule,
    UserModule,
    S3Module,
    CountryModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
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
    CronService,
  ],
})
export class AppModule {}
