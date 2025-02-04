import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { IResponse, IResponseFields } from '../../data/types/api.types';
import { expect } from '../../fixtures/apiContollers.fixture';

/**
 * Validates the JSON schema of a response against a given schema.
 * Uses the Ajv library to compile and validate the schema.
 * Logs schema validation errors to the console if any are found.
 *
 * @template T - The type of the response fields, extending `IResponseFields`.
 * @param {object} schema - The JSON schema to validate against.
 * @param {IResponse<T>} response - The response object to validate.
 * @throws {Error} - Throws an error if the response does not match the schema.
 */
export function validateJsonSchema<T extends IResponseFields>(schema: object, response: IResponse<T>) {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    console.log(validate.errors);
  }

  expect(isValidSchema, 'Should validate json schema').toBe(true);
}
/**
 * Validates the structure and values of a response object.
 * Checks the response status, `IsSuccess` flag, and `ErrorMessage` field.
 *
 * @template T - The type of the response fields, extending `IResponseFields`.
 * @param {IResponse<T>} response - The response object to validate.
 * @param {number} status - The expected HTTP status code.
 * @param {boolean} IsSuccess - The expected value of the `IsSuccess` flag.
 * @param {null | string} ErrorMessage - The expected value of the `ErrorMessage` field.
 * @throws {Error} - Throws an error if any of the response values do not match the expected values.
 */
export function validateResponse<T extends IResponseFields>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
) {
  expect(response.status, `Should get response status code '${status}'`).toBe(status);
  expect(response.body.IsSuccess, `IsSuccess in response should be '${IsSuccess}'`).toBe(IsSuccess);
  expect(response.body.ErrorMessage, `ErrorMessage in response should be '${ErrorMessage}'`).toBe(ErrorMessage);
}
