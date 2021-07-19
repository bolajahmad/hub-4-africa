import { ApiClient } from '../api';
import { OrdersModel } from '../models';

export class OrdersService {
  public static fetchPendingOrders() {
    return ApiClient.get<OrdersModel[]>('admin/all-pending-orders');
  }

  public static fetchOrderStatus() {
    return ApiClient.get<OrdersModel[]>('admin/order-statuses');
  }
}
