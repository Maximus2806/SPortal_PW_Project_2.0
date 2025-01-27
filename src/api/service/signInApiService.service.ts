import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { validateResponse } from '../../utils/validation/apiValidation';
import signInController from '../controllers/signIn.controller';

export class SignInApiService {
  private token: string | null = null;

  constructor(private controller = signInController) {}

  async signInAsAdmin() {
    const response = await this.controller.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    this.setToken(response.headers['authorization']);
    return this.getToken();
  }

  private setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token as string;
  }

  removeToken() {
    this.token = null;
  }
}
