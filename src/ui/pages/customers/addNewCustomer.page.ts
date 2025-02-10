import { ICustomer } from '../../../data/types/customers/customers.types';
import { SalesPortalPage } from '../salesPortal.page';

export class AddNewCustomerPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Add New Customer "]';

  readonly 'Name input' = '#inputName';
  readonly 'Email input' = '#inputEmail';
  readonly 'Country dropdown' = 'select#inputCountry';
  readonly 'City input' = '#inputCity';
  readonly 'Street input' = '#inputStreet';
  readonly 'House input' = '#inputHouse';
  readonly 'Flat input' = '#inputFlat';
  readonly 'Phone input' = '#inputPhone';
  readonly 'Notes textarea' = '#textareaNotes';
  readonly 'Save New Customer button' = '#save-new-customer';

  async fillInputs(customer: Partial<ICustomer>) {
    customer.name && (await this.setValue(this['Name input'], customer.name));
    customer.email && (await this.setValue(this['Email input'], customer.email));
    customer.country && (await this.selectDropdownValue(this['Country dropdown'], customer.country));
    customer.city && (await this.setValue(this['City input'], customer.city));
    customer.street && (await this.setValue(this['Street input'], customer.street));
    customer.house && (await this.setValue(this['House input'], customer.house));
    customer.flat && (await this.setValue(this['Flat input'], customer.flat));
    customer.phone && (await this.setValue(this['Phone input'], customer.phone));
    customer.notes && (await this.setValue(this['Notes textarea'], customer.notes));
  }

  async clickOnSaveButton() {
    await this.click(this['Save New Customer button']);
  }
}
