import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
@Catch(QueryFailedError, EntityNotFoundError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const { url } = request;
    const { message } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message: message,
    };
    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
