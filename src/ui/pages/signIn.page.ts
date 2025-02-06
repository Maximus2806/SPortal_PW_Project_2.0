import { SALES_PORTAL_URL } from '../../config/environment';
import { IUserCredentials } from '../../data/types/user.types';
import { SalesPortalPage } from './salesPortal.page';

export class SignInPage extends SalesPortalPage {
  uniqueElement = '//form[.//input[@id="emailinput"]]';

  readonly 'Email input' = this.findElement('#emailinput');
  readonly 'Password input' = this.findElement('#passwordinput');
  readonly 'Login button' = this.findElement('button.btn-primary');
  readonly 'Login form' = this.findElement("//form[.//*[contains(text(),'Email address')]]");

  async fillCredentialsInputs(credentials: IUserCredentials) {
    await this.setValue(this['Email input'], credentials.username);
    await this.setValue(this['Password input'], credentials.password);
  }

  async clickSubmitButton() {
    await this.click(this['Login button']);
  }

  async openLoginPage() {
    await this.openPage(SALES_PORTAL_URL);
  }
}
