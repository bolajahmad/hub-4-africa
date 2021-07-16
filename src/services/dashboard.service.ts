import { ApiClient } from '../api';
import { OrdersModel } from '../models';

export class DashboardService {
  public static fetchAllOrders() {
    return ApiClient.get<OrdersModel>('admin/all-shipped-orders');
  }
}
