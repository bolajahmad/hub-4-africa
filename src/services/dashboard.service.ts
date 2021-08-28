import { ApiClient } from '../api';
import { CreateAdminModel, OrdersModel, OrderStatsType } from '../models';
import { Admins } from '../models/admins';

export class DashboardService {
  public static fetchAllOrders(type?: OrderStatsType, warehouseId?: string) {
    let url: string;
    switch (type) {
      case 'awaitingShipment':
        url = 'admin/all-un-shipped';
        break;
      case 'fulfilled':
        url = 'admin/all-completed-orders';
        break;
      case 'rejected':
        url = 'admin/all-rejected-orders';
        break;
      case 'Shipped':
        url = 'admin/all-shipped-orders';
        break;
      default:
        url = 'admin/all-orders';
        break;
    }
    return ApiClient.get<OrdersModel[]>(`${url}${warehouseId ? ' ? warehouseId = ' + warehouseId : ''}`);
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
