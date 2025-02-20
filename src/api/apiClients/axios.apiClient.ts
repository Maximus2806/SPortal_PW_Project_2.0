import axios, { AxiosError, AxiosRequestConfig, isAxiosError, AxiosResponse } from 'axios';
import { IRequestOptions, IResponse, IResponseFields } from '../../data/types/api.types';
import { reportApiRequest } from '../../utils/reporter/api';

export class AxiosApiClient {
  private response: AxiosResponse | undefined;
  async send<T extends IResponseFields>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.response = await axios(options as AxiosRequestConfig);
      return this.transformResponse();
    } catch (err: unknown) {
      if (!isAxiosError(err)) throw err;
      else {
        console.log('Error', (err as AxiosError).message);
        console.log('Request URL:', options.method, options.url);
        this.response = (err as AxiosError).response;
        return this.transformResponse();
      }
    } finally {
      await reportApiRequest<T>(options, this.transformResponse());
    }
  }

  private transformResponse() {
    return {
      body: this.response && this.response.data ? this.response.data : null,
      status: this.response!.status,
      headers: this.response!.headers
    };
  }
}
