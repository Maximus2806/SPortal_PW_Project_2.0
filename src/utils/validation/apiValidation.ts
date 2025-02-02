import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { IResponse, IResponseFields } from '../../data/types/api.types';
import { expect } from '../../fixtures/apiContollers.fixture';

export function validateJsonSchema<T extends IResponseFields>(schema: object, response: IResponse<T>) {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    console.log(validate.errors);
  }

  expect(isValidSchema).toBe(true);
}

export function validateResponse<T extends IResponseFields>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
) {
  expect(response.status).toBe(status);
  expect(response.body.IsSuccess).toBe(IsSuccess);
  expect(response.body.ErrorMessage).toBe(ErrorMessage);
}
