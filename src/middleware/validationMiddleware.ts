import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { RequestHandler } from 'express';
import { ValidationException } from '../exceptions/ValidationException';

const validationMiddleware = (config: ValidatorConfig): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(config.type, req[config.value]), { skipMissingProperties: config.skipMissingProperties, whitelist: config.whitelist, forbidNonWhitelisted: config.forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new ValidationException(message));
      } else {
        next();
      }
    });
  };
};

export class ValidatorConfig {
  type: any;
  value: 'body' | 'query' | 'params' = 'body'
  skipMissingProperties = false
  whitelist = false
  forbidNonWhitelisted = false
}

export default validationMiddleware;
