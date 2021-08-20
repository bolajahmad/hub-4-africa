import { ApiClient } from '../api';
import { CreateAdminModel, OrdersModel, OrderStatsType } from '../models';
import { Admins } from '../models/admins';

export class DashboardService {
  public static fetchAllOrders() {
    return ApiClient.get<OrdersModel[]>('admin/all-shipped-orders');
  }

  public static allRejectedOrders() {
    return ApiClient.get<OrdersModel[]>('admin/all-rejected-orders');
  }

  public static allCOmpletedOrders() {
    return ApiClient.get<OrdersModel[]>('admin/all-completed-orders');
  }

  public static fetchOrderStats() {
    return ApiClient.get<Record<OrderStatsType, number>>('admin/order-stats');
  }

  public static createAdmin(model: CreateAdminModel) {
    return ApiClient.post<CreateAdminModel>('admin/create-admin', model);
  }

  public static getAdmins() {
    return ApiClient.get<Admins[]>('admin/all-admins');
  }
}
