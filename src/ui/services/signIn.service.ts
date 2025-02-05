import { Page } from '@playwright/test';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/env';
import { IUserCredentials } from '../../data/types/user.types';
import { HomePage } from '../pages/home.page';
import { SignInPage } from '../pages/signIn.page';

export class SignInPageService {
  private signInPage: SignInPage;
  private homePage: HomePage;
  constructor(protected page: Page) {
    this.signInPage = new SignInPage(page);
    this.homePage = new HomePage(page);
  }

  async openSalesPortal() {
    await this.signInPage.openLoginPage();
  }

  async login(credentials: IUserCredentials) {
    await this.signInPage.fillCredentialsInputs(credentials);
    await this.signInPage.clickSubmitButton();
    await this.homePage.waitForOpened();
  }

  async loginAsAdmin() {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  // async signOut() {
  //   await this.signInPage.deleteCookies(["Authorization"]);
  // }
}
