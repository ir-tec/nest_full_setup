import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppException } from './common/exceptions/app.exception';
import { ErrorCode } from './common/exceptions/error-codes';
import { flattenValidationErrors } from './common/validation/validation-error-messages';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableVersioning({ type: VersioningType.URI })
  app.useGlobalPipes(new ValidationPipe({

    // this property makes the unwanted properties the user send to remove from body
    // every dto that we want should have a validation in order to pass the validation
    whitelist: true,
    forbidNonWhitelisted: true,
    // transform is for changing the queries and parameter type as we need them 
    // it does not change the type by defult we also need to change the type when need it ,
    transform: true,
    exceptionFactory: (errors) => {
      return new AppException(
        ErrorCode.VALIDATION_ERROR,
        'Request validation failed',
        HttpStatus.BAD_REQUEST,
        flattenValidationErrors(errors),
      );
    },
  }))
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  await app.listen(port);
}
void bootstrap();
