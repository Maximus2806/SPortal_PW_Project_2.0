import { generateProductData } from '../../../data/products/generateProduct';
import { IProduct } from '../../../data/types/products/product.types';
import { AddNewProductPage } from '../../pages/Products/addNewProduct.page';
import { SalesPortalPageService } from '../salesPortal.service';
import { ProductsListPage } from '../../pages/products/products.page';
import { logStep } from '../../../utils/reporter/logStep';

export class AddNewProductPageService extends SalesPortalPageService {
  private addNewProductPage = new AddNewProductPage(this.page);
  private productsPage = new ProductsListPage(this.page);

  @logStep('Create product via UI')
  async createNewProduct(productDataInput?: IProduct) {
    const productData = generateProductData(productDataInput);
    await this.addNewProductPage.fillInputs(productData);
    await this.addNewProductPage.clickOnSaveButton();
    await this.productsPage.waitForOpened();
    return productData;
  }
}

