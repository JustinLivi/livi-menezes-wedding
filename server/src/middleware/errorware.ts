import { ErrorRequestHandler } from 'express';
import { STATUS_CODES } from 'http';
import { HttpError } from 'http-errors';
import { find } from 'lodash';
import { ValidationError } from 'yup';

import { log } from '../log';

export interface INormalizedError {
  // external status code
  status: number;
  // external description
  description?: string;
  // external details
  details?: ValidationError;
  // internal message
  message?: string;
  // internal stack trace
  stack?: string;
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
  statusCode,
  stack
}: HttpError): INormalizedError => ({
  description:
    (expose ? message : description) || STATUS_CODES[status || statusCode],
  message,
  stack,
  status: status || statusCode
});

export const normalizeApplicationError = ({
  message,
  stack
}: Error | TypeError): INormalizedError => ({
  description: STATUS_CODES[500],
  message,
  stack,
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

export const errorNormalizationMap = [
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
      errorNormalizationMap,
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
  const { status, description, details, message, stack } = normalizeError(
    error
  );
  if (status >= 500) {
    log.error(
      { status, description, details, stack },
      `Handling error '${message}'`
    );
  } else {
    log.info(
      { status, description, details, stack },
      `Handling error '${message}'`
    );
  }
  res.send({
    description,
    details,
    status
  });
};
