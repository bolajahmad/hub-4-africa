import { ApiClient } from '../api';
import { CreateAdminModel, OrdersModel, OrderStatsType } from '../models';

export class DashboardService {
  public static fetchAllOrders() {
    return ApiClient.get<OrdersModel>('admin/all-shipped-orders');
  }

  public static fetchOrderStats() {
    return ApiClient.get<Record<OrderStatsType, number>>('admin/order-stats');
  }

  public static createAdmin(model: CreateAdminModel) {
    return ApiClient.post<CreateAdminModel>('admin/create-admin', model);
  }
}
