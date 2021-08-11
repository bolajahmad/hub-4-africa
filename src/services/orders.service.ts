import { ApiClient } from '../api';
import { OrdersModel, RequestPriceEstimateModel } from '../models';

export class OrdersService {
  public static fetchPendingOrders() {
    return ApiClient.get<OrdersModel[]>('admin/all-pending-orders');
  }

  public static fetchOrderStatus() {
    return ApiClient.get<OrdersModel[]>('admin/order-statuses');
  }

  public static trackOrder(id: string) {
    return ApiClient.get<OrdersModel>(`admin/${id}`);
  }

  public static orderEstimate(model: RequestPriceEstimateModel) {
    return ApiClient.post<
      RequestPriceEstimateModel,
      { estimatedPrice: number }
    >('order/estimate', model);
  }
}
