import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes';

export class AppException extends HttpException {
  constructor(
    code: ErrorCode,
    message: string,
    statusCode: HttpStatus,
    details?: unknown,
  ) {
    super(
      {
        code,
        message,
        details,
      },
      statusCode,
    );
  }
}