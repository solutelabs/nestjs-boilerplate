import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ValidationError } from 'class-validator';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);

    if (!exception.getResponse) {
      throw new InternalServerErrorException(exception.toString());
    }

    const errorResponse: any = exception.getResponse();

    /**
     * Converting class-validator error intto fieldwise array
     */
    if (
      Array.isArray(errorResponse.message) &&
      errorResponse.message[0] instanceof ValidationError
    ) {
      const validationErrorMessage: any = this.retrieveValidationErrorMessage(
        errorResponse.message,
      );

      exception.message = validationErrorMessage;
    }

    /**
     * Converting first letter of error message to UPPERCASE
     */
    if (typeof exception.message === 'string') {
      let message = exception.message;
      message = message.charAt(0).toUpperCase() + message.slice(1);
      exception.message = message;
    }
    return exception;
  }

  /**
   * @param message
   * funciton to convert class-validator error into fieldwise array of errors
   */
  retrieveValidationErrorMessage(message: [ValidationError]) {
    const response = [];
    message.forEach((m) => {
      const msg = {};
      const constraints = Object.values(m.constraints);
      msg[m.property] = constraints;
      response.push(msg);
    });
    return response;
  }
}
