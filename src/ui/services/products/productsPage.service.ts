import _ from 'lodash';
import { expect } from 'allure-playwright';
import { SalesPortalPageService } from '../salesPortal.service';
import { logStep } from '../../../utils/reporter/logStep';
import { IProduct, IProductFromResponse, IProductFromTable } from '../../../data/types/products/product.types';
import { ProductsListPage } from '../../pages/products/products.page';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page';
import { ProductDetailsModal } from '../../pages/products/details.modal';
import { SideBarPage } from '../../pages/sidebar.page';
import { DeleteModalPage } from '../../pages/modals/delete-modal.page';
import { FilterModalPage } from '../../pages/modals/filter-modal.page';
import { genericSort } from '../../../utils/sort-algorithm';
import { TSortOrder } from '../../../data/types/sortFields.type';
import { TTableFields } from '../../../data/types/products/productSortFields';

export class ProductsListPageService extends SalesPortalPageService {
  private productsPage = new ProductsListPage(this.page);
  private addNewProductPage = new AddNewProductPage(this.page);
  private productDetailsModal = new ProductDetailsModal(this.page);
  private sidebarPage = new SideBarPage(this.page);
  private deleteProductModal = new DeleteModalPage(this.page);
  private filterModal = new FilterModalPage(this.page);

  @logStep('Open Add New Product Page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep('Open edit product page')
  async openEditPageForProductWithName(productName: string) {
    await this.productsPage.clickOnEditProductButton(productName);
  }

  async vefiryPageActiveInSidebar() {
    const attr = await this.sidebarPage.getSidebarModuleButtonAttribute('Products', 'class');
    expect(attr, `"Products" sidebar button should be "active", actual class attribute: "${attr}"`).toContain('active');
  }

  async openHomePage() {
    await this.sidebarPage.clickOnSidebarModuleButton('Home');
  }

  @logStep('Open product details modal window')
  async openProductDetails(productName: string) {
    await this.productsPage.clickOnProductDetailsButton(productName);
    await this.productDetailsModal.waitForOpened();
  }

  @logStep('Close product details modal window')
  async closeProductDetailsModal() {
    await this.productDetailsModal.clickOnCloseModalButton();
    await this.productsPage.waitForOpened();
  }

  async getProductDataFromModal(productName: string) {
    await this.openProductDetails(productName);
    const actualData = await this.productDetailsModal.getProductData();
    await this.closeProductDetailsModal();
    return actualData;
  }

  @logStep('Verify product data in table')
  async verifyProductDataInTable(product: IProduct | IProductFromResponse) {
    const actualProduct = _.omit(await this.productsPage.getProductFromTable(product.name), ['createdOn']);
    const testProduct = _.omit(product, ['createdOn', 'amount', 'notes']);
    expect(
      actualProduct,
      `Shoul verify product data in table to be expected ${JSON.stringify(testProduct, null, 2)}`
    ).toEqual(testProduct);
  }

  @logStep('Verify product data in details modal window')
  async verifyProductDataInModal(product: IProduct) {
    const actualData = _.omit(await this.getProductDataFromModal(product.name), ['createdOn']);
    expect(
      actualData,
      `Shoul verify product data in modal window to be expected ${JSON.stringify(product, null, 2)}`
    ).toEqual(product);
  }

  @logStep('Delete product on "Products list" page')
  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.deleteProductModal.waitForOpened();
    await this.deleteProductModal.clickOnActionButton();
    await this.productsPage.waitForOpened();
  }

  // @logStep('Check product uniqueness via search')
  // async validateSearchSingleProduct(searchInput: string, product: IProduct) {
  //   const searchResult = await this.productsPage.getSearchResults(searchInput);
  //   expect(_.omit(searchResult[0] as Partial<IProduct>, ['createdOn'])).toEqual(_.omit(product, ['amount', 'notes']));
  //   expect(searchResult.length).toBe(1);
  // }

  // @logStep('Check search output matches input')
  // async validateSearchMatch(searchInput: string) {
  //   const searchResult = await this.productsPage.getSearchResults(searchInput);
  //   if (Array.isArray(searchResult)) {
  //     searchResult.forEach((item) => expect(item.name).toContain(searchInput));
  //   } else expect(searchResult).toBe(NOFITICATIONS.NO_SEARCH_RESULTS);
  // }

  @logStep('Sort table by provided column and order')
  async sortByColumnTitle(title: TTableFields, order: 'asc' | 'desc') {
    const isCurrent = (await this.productsPage.getHeaderAtribute(title, 'current')) === 'true';
    const currentDirection = await this.productsPage.getHeaderAtribute(title, 'direction');
    if (!isCurrent || !currentDirection) {
      if (order === 'asc') {
        await this.productsPage.clickOnColumnTitle(title);
      } else {
        await this.productsPage.clickOnColumnTitle(title);
        await this.productsPage.waitForSpinnersToHide();
        await this.productsPage.clickOnColumnTitle(title);
      }
    } else if (currentDirection === 'asc' && order === 'desc') {
      await this.productsPage.clickOnColumnTitle(title);
    } else if (currentDirection === 'desc' && order === 'asc') {
      await this.productsPage.clickOnColumnTitle(title);
    }
    await this.productsPage.waitForSpinnersToHide();
  }

  @logStep('Verify sorting result is correct')
  async verifySortResults(header: TTableFields, order: TSortOrder) {
    await this.sortByColumnTitle(header, order);
    const productsFromSortedTable = await this.productsPage.getProductsFromTable();
    const field = header.toLowerCase() as keyof IProductFromTable;
    const sortedProductsFromSortedTable = genericSort(
      productsFromSortedTable as (IProductFromTable & { _id: string })[],
      field,
      order
    );
    const isSorted = sortedProductsFromSortedTable.every((p, i) => p[field] === productsFromSortedTable[i][field]);

    expect(isSorted, `Sorted products should match the expected order for field "${header}"`).toBe(true);
  }
}
