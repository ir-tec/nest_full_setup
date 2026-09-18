import { ValidationError } from 'class-validator';

export function flattenValidationErrors(
  errors: ValidationError[],
): string[] {
  return errors.flatMap((error) => {
    return Object.values(error.constraints ?? {});
  });
}