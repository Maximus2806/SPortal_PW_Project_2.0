import * as allure from 'allure-js-commons';
import { IRequestOptions, IResponse, IResponseFields } from '../../data/types/api.types';

export function reportApiRequest<T extends IResponseFields>(requestOptions: IRequestOptions, response: IResponse<T>) {
  logApiRequest(requestOptions);
  logApiResponse(requestOptions, response);
}

export function logApiRequest(requestOptions: IRequestOptions) {
  allure.step(`Request: ${requestOptions?.method?.toUpperCase()} ${requestOptions?.url}`, () => {
    allure.attachment('Request Headers', JSON.stringify(requestOptions?.headers, null, 2), 'application/json');
    allure.attachment(
      'Request Body',
      requestOptions?.data ? JSON.stringify(requestOptions?.data, null, 2) : '{}',
      'application/json'
    );
  });
}

export function logApiResponse<T extends IResponseFields>(requestOptions: IRequestOptions, response: IResponse<T>) {
  allure.step(`Response: ${response?.status} ${requestOptions?.url}`, () => {
    allure.attachment('Response Headers', JSON.stringify(response?.headers, null, 2), 'application/json');
    allure.attachment('Response Body', JSON.stringify(response?.body, null, 2), 'application/json');

    // Устанавливаем статус шага
    if (response && response.status >= 500) {
      throw new Error(`API Response failed with status: ${response.status}`);
      //   allure.setStatus("failed");
      // } else {
      //   allure.setStatus("passed");
    }
  });
}
