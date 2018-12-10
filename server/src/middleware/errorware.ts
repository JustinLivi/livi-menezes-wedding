import { ErrorRequestHandler } from 'express';
import { STATUS_CODES } from 'http';
import { HttpError } from 'http-errors';
import { find } from 'lodash';
import { ValidationError } from 'yup';

export interface INormalizedError {
  // external status code
  status: number;
  // external description
  description?: string;
  // external details
  details?: ValidationError;
  // internal message
  message?: string;
}

// tslint:disable-next-line:ban-types
export interface IErrorMap<ErrorClass> {
  errorClass: ErrorClass;
  errorNormalizer: (error: ErrorClass) => INormalizedError;
}

export const normalizeStringError = (error: string): INormalizedError => ({
  description: STATUS_CODES[500],
  message: error,
  status: 500
});

export const normalizeValidationError = (
  error: ValidationError
): INormalizedError => ({
  description: 'Invalid request',
  details: error,
  message: error.message,
  status: 400
});

export const normalizeHttpError = ({
  message,
  expose,
  description,
  status,
  statusCode
}: HttpError): INormalizedError => ({
  description:
    (expose ? message : description) || STATUS_CODES[status || statusCode],
  message,
  status: status || statusCode
});

export const normalizeApplicationError = ({
  message
}: Error | TypeError): INormalizedError => ({
  description: STATUS_CODES[500],
  message,
  status: 500
});

export const normalizeUnknownError = (error: any): INormalizedError => {
  if (typeof error.status === 'number' && STATUS_CODES[error.status]) {
    return normalizeHttpError(error);
  }
  if (typeof error.statusCode === 'number' && STATUS_CODES[error.statusCode]) {
    return normalizeHttpError(error);
  }
  return normalizeStringError(error);
};

export const errorMap = [
  {
    errorClass: HttpError,
    errorNormalizer: normalizeHttpError
  },
  {
    errorClass: ValidationError,
    errorNormalizer: normalizeValidationError
  },
  {
    errorClass: Error,
    errorNormalizer: normalizeApplicationError
  },
  {
    errorClass: TypeError,
    errorNormalizer: normalizeApplicationError
  }
];

export const normalizeError = (error: any): INormalizedError => {
  const primitiveType = typeof error;
  if (primitiveType === 'string') {
    return normalizeStringError(error);
  }
  if (primitiveType === 'object') {
    const normalizer = find(
      errorMap,
      ({ errorClass }) => error instanceof errorClass
    );
    if (normalizer) {
      return (normalizer.errorNormalizer as (error: any) => INormalizedError)(
        error
      );
    }
    return normalizeUnknownError(error);
  }
  return normalizeUnknownError(error);
};

export const errorware: ErrorRequestHandler = (error, req, res, next) => {
  if (!error) {
    return next();
  }
  const normalizedError = normalizeError(error);
};
