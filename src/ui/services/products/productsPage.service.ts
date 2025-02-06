import _ from 'lodash';
import { PRODUCT_TABLE_HEADERS } from '../../../data/Products/productTableHeaders';
import { expect } from 'allure-playwright';
import { SalesPortalPageService } from '../salesPortal.service';
import { logStep } from '../../../utils/reporter/logStep';
import { IProduct, IProductFromTable } from '../../../data/types/products/product.types';
import { ProductsListPage } from '../../pages/products/products.page';
import { AddNewProductPage } from '../../pages/Products/addNewProduct.page';
import { ProductDetailsModal } from '../../pages/products/details.modal';
import { SideBarPage } from '../../pages/sidebar.page';

export class ProductsListPageService extends SalesPortalPageService {
  private productsPage = new ProductsListPage(this.page);
  private addNewProductPage = new AddNewProductPage(this.page);
  private productDetailsModal = new ProductDetailsModal(this.page);
  private sidebarPage = new SideBarPage(this.page);
  // private deleteProductModal = ;

  @logStep('Open Add New Product Page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  async vefiryPageActiveInSidebar() {
    const attr = await this.sidebarPage.getSidebarModuleButtonAttribute('Products', 'class');
    console.log(`attr ${attr}`);
    expect(attr, `"Products" sidebar button should be "active", actual attribute: "${attr}" `).toContain('active');
  }

  async openProductDetails(productName: string) {
    await this.productsPage.clickOnProductDetailsButton(productName);
    await this.productDetailsModal.waitForOpened();
  }

  async closeProductDetailsModal() {
    await this.productDetailsModal.clickOnCloseModalButton();
    await this.productDetailsModal.waitForOpened();
  }

  async getProductDataFromModal(productName: string) {
    await this.openProductDetails(productName);
    const actualData = await this.productDetailsModal.getProductData();
    await this.closeProductDetailsModal();
    return actualData;
  }

  @logStep('Verify product data in modal window')
  async verifyProductDataInModal(product: IProduct) {
    const actualData = _.omit(await this.getProductDataFromModal(product.name), ['createdOn']);
    expect(
      actualData,
      `Shoul verify product data in modal window to be expected ${JSON.stringify(product, null, 2)}`
    ).toEqual(product);
  }

  @logStep('Delete product via UI')
  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.deleteProductModal.waitForPageOpened();
    await this.deleteProductModal.clickOnActionButton();
    await this.deleteProductModal.waitForDisappeared();
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
  async sortByColumnTitle(title: PRODUCT_TABLE_HEADERS, order: 'asc' | 'desc') {
    const isCurrent = (await this.productsPage.getHeaderAtribute(title, 'current')) === 'true';
    const currentDirection = await this.productsPage.getHeaderAtribute(title, 'direction');
    if (!isCurrent || !currentDirection) {
      if (order === 'asc') {
        await this.productsPage.clickOnColumnTitle(title);
      } else {
        await this.productsPage.clickOnColumnTitle(title);
        await this.productsPage.waitForSpinnersToBeHidden('Table rendering');
        await this.productsPage.clickOnColumnTitle(title);
      }
    } else if (currentDirection === 'asc' && order === 'desc') {
      await this.productsPage.clickOnColumnTitle(title);
    } else if (currentDirection === 'desc' && order === 'asc') {
      await this.productsPage.clickOnColumnTitle(title);
    }
    await this.productsPage.waitForSpinnersToBeHidden('Table rendering');
  }

  sortProductsArray(products: IProductFromTable[], field: keyof IProductFromTable, order: 'asc' | 'desc') {
    return products.sort((a, b) => {
      const valueA = field === 'createdOn' ? Date.parse(a[field] as string) : a[field];
      const valueB = field === 'createdOn' ? Date.parse(b[field] as string) : b[field];
      if (valueA === undefined || valueB === undefined) throw new Error('Inncorrect incoming parameters');
      return order === 'asc' ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
    });
  }

  mapEnumToKey(header: PRODUCT_TABLE_HEADERS): keyof IProductFromTable {
    return header
      .toLowerCase()
      .split(' ')
      .map((word, index) => (index === 0 ? word : word[0].toUpperCase() + word.slice(1)))
      .join('') as keyof IProductFromTable;
  }

  @logStep('Verify sorting result is correct')
  async verifySortingResults(header: PRODUCT_TABLE_HEADERS, order: 'asc' | 'desc') {
    await this.sortByColumnTitle(header, order);
    const field = this.mapEnumToKey(header);
    const productsFromSortedTable = await this.productsPage.getProductsFromTable();
    const productsFromSortedTableKeys = productsFromSortedTable.map((product) => product[field]);
    const sortedProductsFromSortedTable = this.sortProductsArray(
      productsFromSortedTable as IProductFromTable[],
      field,
      order
    );
    const sortedProductsFromSortedTableKeys = sortedProductsFromSortedTable.map((product) => product[field]);
    expect(sortedProductsFromSortedTableKeys).toEqual(productsFromSortedTableKeys);
  }
}
