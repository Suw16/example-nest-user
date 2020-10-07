import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException> {
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;
    console.log('error badrequest ::', exception.response.message);
    response.status(400).json({
      success: false,
      message: exception.response.message,
    });
  }
}
