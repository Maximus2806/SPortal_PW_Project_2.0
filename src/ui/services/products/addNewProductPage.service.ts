import addNewProductPage from '../../pages/Products/addNewProduct.page';
import { generateProductData } from '../../../data/Products/generateProduct';
import { IProduct } from '../../../data/types/product.types';
import productsPage from '../../pages/Products/products.page';
import { logStep } from '../../../utils/reporter/decorators';

class AddNewProductPageService {
  private addNewProductPage = addNewProductPage;
  private productsPage = productsPage;

  @logStep('Create product via UI')
  async createNewProduct(productDataInput?: IProduct) {
    const productData = generateProductData(productDataInput);
    await this.addNewProductPage.fillInputs(productData);
    await this.addNewProductPage.clickOnSaveButton();
    await this.productsPage.waitForPageOpened();
    return productData;
  }
}

export default new AddNewProductPageService();
