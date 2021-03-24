import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ENVIRONMENT } from '../../environment';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      debug: false,
      playground: ENVIRONMENT !== 'production',
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      useGlobalPrefix: true,
      introspection: true,
      formatError: (error: GraphQLError) => {
        return {
          message: error.message,
          statusCode: error.extensions.exception.response.statusCode,
          errorCode: error.extensions.exception.response.error,
        };
      },
    };
  }
}
