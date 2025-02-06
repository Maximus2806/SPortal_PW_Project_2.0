import { logStep } from '../../utils/reporter/logStep';
import { SalesPortalPage } from './salesPortal.page';

export class SideBarPage extends SalesPortalPage {
  readonly uniqueElement: string = `//a[./span[.='Sales Portal']]`;
  readonly ['Sidebar module button'] = (module: 'Home' | 'Orders' | 'Customers' | 'Products') =>
    this.findElement(`//a[@name="${module}"]`);
  readonly ['Dark mode switch'] = this.findElement(`#sp-theme-switch`);

  @logStep()
  async clickOnSidebarModuleButton(module: 'Home' | 'Orders' | 'Customers' | 'Products') {
    await this.click(this['Sidebar module button'](module));
  }

  @logStep()
  async clickOnDarkModeSwitch() {
    await this.click(this['Dark mode switch']);
  }

  async getSidebarModuleButtonAttribute(module: 'Home' | 'Orders' | 'Customers' | 'Products', attribute: string) {
    return await this.getElementAttribute(this['Sidebar module button'](module), attribute);
  }
}
