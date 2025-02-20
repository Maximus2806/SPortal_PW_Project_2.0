import * as allure from 'allure-js-commons';
import { IRequestOptions, IResponse, IResponseFields } from '../../data/types/api.types';

export const logApiRequest = async (requestOptions: IRequestOptions) => {
  await allure.step(`Request: ${requestOptions?.method?.toUpperCase()} ${requestOptions?.url}`, async () => {
    await allure.attachment('Request Headers', JSON.stringify(requestOptions?.headers, null, 2), 'application/json');
    await allure.attachment(
      'Request Body',
      requestOptions?.data ? JSON.stringify(requestOptions?.data, null, 2) : '{}',
      'application/json'
    );
  });
};

export const logApiResponse = async <T extends IResponseFields>(
  requestOptions: IRequestOptions,
  response: IResponse<T>
) => {
  await allure.step(`Response: ${response?.status} status, ${requestOptions?.url}`, async () => {
    await allure.attachment('Response Headers', JSON.stringify(response?.headers, null, 2), 'application/json');
    await allure.attachment('Response Body', JSON.stringify(response?.body, null, 2), 'application/json');
  });
};

export const reportApiRequest = async <T extends IResponseFields>(
  requestOptions: IRequestOptions,
  response: IResponse<T>
) => {
  await logApiRequest(requestOptions);
  await logApiResponse(requestOptions, response);
};
