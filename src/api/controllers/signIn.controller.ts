import { apiConfig } from '../../config/apiConfig';
import { ICredentials } from '../../data/types/signIn.types';
import { IRequestOptions, IResponseFields } from '../../data/types/api.types';
import { AxiosApiClient } from '../apiClients/axios.apiClient';
import { logStep } from '../../utils/reporter/logStep';

class SignInController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Sign in via API')
  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      data: credentials,
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login
    };
    return await this.apiClient.send<IResponseFields>(options);
  }
}

export default new SignInController();
