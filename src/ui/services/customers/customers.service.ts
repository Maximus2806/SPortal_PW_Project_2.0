import _ from 'lodash';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from '../../../data/notifications.js';
import { SalesPortalPageService } from '../salesPortal.service.js';
import { COUNTRIES } from '../../../data/customers/countries.js';
import { FilterModalPage } from '../../pages/modals/filter-modal.page.js';
import { CustomerDetailsPage } from '../../pages/customers/customerDetails.page';
import { ICustomer, ICustomerFromResponse, ICustomerFromTable } from '../../../data/types/customers/customers.types.js';
import { logStep } from '../../../utils/reporter/logStep.js';
import { DeleteModalPage } from '../../pages/modals/delete-modal.page.js';
import { EditCustomerPage } from '../../pages/customers/editCustomer.page.js';
import { TCustomerTableFields } from '../../../data/types/customers/customerSort.types.js';
import { TSortOrder } from '../../../data/types/sortFields.type.js';
import { genericSort } from '../../../utils/sort-algorithm.js';

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private filterModalPage: FilterModalPage;
  private customerDetailsPage: CustomerDetailsPage;
  private deleteModal: DeleteModalPage;
  private editCustomerPage: EditCustomerPage;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.filterModalPage = new FilterModalPage(page);
    this.customerDetailsPage = new CustomerDetailsPage(page);
    this.deleteModal = new DeleteModalPage(page);
    this.editCustomerPage = new EditCustomerPage(page);
  }

  @logStep('Open customers page')
  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep('Open customer detailse page')
  async openCustomerDetails(customerEmail: string) {
    await this.customersPage.clickOnCustomerDetails(customerEmail);
    await this.customerDetailsPage.waitForOpened();
  }

  @logStep('Open edit page for customer with email')
  async openEditPageForCustomerWithEmail(customerEmail: string) {
    await this.customersPage.clickOnEditCustomer(customerEmail);
    await this.editCustomerPage.waitForOpened();
  }

  @logStep('Validate notification')
  async validateCreateCustomerNotification() {
    const notificationText = await this.customersPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  }

  @logStep('Verify empty table text')
  async validateEmpryTableText() {
    const actualText = await this.customersPage.getEmptyTableMessage();
    expect(actualText).toBe('No records created yet');
  }

  @logStep('Set and applycountry filter')
  async applyCountryFilter(countries: COUNTRIES[]) {
    await this.customersPage.clickOnFilterButton();
    await this.filterModalPage.checkFilterBox(countries);
    await this.filterModalPage.clickOnActionButton();
    await this.customersPage.waitForOpened();
  }

  @logStep('Delete customer from table')
  async deleteCustomer(customerEmail: string) {
    await this.customersPage.clickOnDeleteCustomer(customerEmail);
    await this.deleteModal.waitForOpened();
    await this.deleteModal.clickOnActionButton();
  }

  @logStep('Submit delete button on "Edit page"')
  async deleteFromEditPage() {
    await this.editCustomerPage.clickOnDeleteCustomerButton();
    await this.deleteModal.waitForOpened();
    await this.deleteModal.clickOnActionButton();
  }

  @logStep('Verify filter output results')
  async validateFilterResults(value: string) {
    const customers = await this.customersPage.getAllCustomersFromTable();
    if (customers.length === 0) {
      console.log('No customers found');
      await this.validateEmpryTableText();
    } else {
      customers.every((customer) => expect(customer.country).toContain(value));
    }
  }

  @logStep('Retreive customer data from details page')
  async getCustomerDataFromModal(customerEmail: string) {
    await this.openCustomerDetails(customerEmail);
    const actualData = await this.customerDetailsPage.getCustomerData();
    return actualData;
  }

  @logStep('Verify customer data in table')
  async validateCustomerDataInTable(customer: ICustomer | ICustomerFromResponse) {
    const testCustomer = _.pick(customer, ['email', 'name', 'country']);
    const actualData = await this.customersPage.getCustomerFromTable(customer.email);
    expect(
      _.omit(actualData, ['createdOn']),
      `Shoul verify product data in table to be expected ${JSON.stringify(testCustomer, null, 2)}`
    ).toEqual(testCustomer);
  }

  @logStep('Verify customer data on details page')
  async validateCustomerDataInModal(customer: ICustomer) {
    const actualData = _.omit(await this.getCustomerDataFromModal(customer.email), ['createdOn']);
    const convertedActualData = { ...actualData, house: +actualData.house, flat: +actualData.flat };
    expect(
      convertedActualData,
      `Shoul verify product data in modal window to be expected ${JSON.stringify(customer, null, 2)}`
    ).toEqual(customer);
  }

  @logStep('Sort customers table by provided column and order')
  async sortByColumnTitle(title: TCustomerTableFields, order: 'asc' | 'desc') {
    const isCurrent = (await this.customersPage.getHeaderAttribute(title, 'current')) === 'true';
    const currentDirection = await this.customersPage.getHeaderAttribute(title, 'direction');
    if (!isCurrent || !currentDirection) {
      if (order === 'asc') {
        await this.customersPage.clickOnColumnTitle(title);
      } else {
        await this.customersPage.clickOnColumnTitle(title);
        await this.customersPage.waitForSpinnersToHide();
        await this.customersPage.clickOnColumnTitle(title);
      }
    } else if (currentDirection === 'asc' && order === 'desc') {
      await this.customersPage.clickOnColumnTitle(title);
    } else if (currentDirection === 'desc' && order === 'asc') {
      await this.customersPage.clickOnColumnTitle(title);
    }
    await this.customersPage.waitForSpinnersToHide();
  }

  async verifySortingResults(header: TCustomerTableFields, order: TSortOrder) {
    await this.sortByColumnTitle(header, order);
    const customersFromSortedTable = await this.customersPage.getAllCustomersFromTable();
    const field = header.toLowerCase() as keyof ICustomerFromTable;
    const sortedCustomersFromSortedTable = genericSort(
      customersFromSortedTable as (ICustomerFromTable & { _id: string })[],
      field,
      order
    );
    const isSorted = sortedCustomersFromSortedTable.every((c, i) => c[field] === customersFromSortedTable[i][field]);

    expect(isSorted, `Sorted customers should match the expected order for field "${header}"`).toBe(true);
  }
}
