import { ApiClient } from '../api';
import { OrdersModel } from '../models';

export class OrdersService {
  public static fetchPendingOrders() {
    return ApiClient.get<OrdersModel[]>('admin/all-pending-orders');
  }

  public static fetchOrderStatus() {
    return ApiClient.get<OrdersModel[]>('admin/order-statuses');
  }

  public static trackOrder(id: string) {
    return ApiClient.get<OrdersModel>(`admin/order/${id}`);
  }

  public static orderEstimate(model: { weight: number; orderId: string }) {
    return ApiClient.patch<
      { weight: number; orderId: string },
      { estimatedPrice: number }
    >('admin/update-order-price', model);
  }

  public static updateOrderStatus(model: { orderStatus: number, orderId: string }) {
    return ApiClient.patch<{ orderStatus: number, orderId: string }>('admin/update-order-status', model);
  }
}
