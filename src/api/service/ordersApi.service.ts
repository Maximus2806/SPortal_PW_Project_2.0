import { OrdersController } from '../controllers/orders.controller';
import { SignInApiService } from './signInApiService.service';

export class OrdersApiService {
  private createdOrders: unknown[] = [];

  constructor(
    private ordersController = new OrdersController(),
    private signInApiService = new SignInApiService()
  ) {}

  async getAll(params = {}, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    return (await this.ordersController.getAll(params, authToken)).body.Orders;
  }

  async delete(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    await this.ordersController.delete(id, authToken);
  }
}
