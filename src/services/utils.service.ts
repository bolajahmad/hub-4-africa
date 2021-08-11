import { ApiClient } from '../api';
import {
  CreateWarehouse,
  PackageConditionsModel,
  WarehouseModel
} from '../models';

export class UtilService {
  public static fetchWarehouse() {
    return ApiClient.get<WarehouseModel[]>('warehouse');
  }

  public static createWarehouse(model: CreateWarehouse) {
    return ApiClient.post<CreateWarehouse>('warehouse', model);
  }

  public static fetchConditions() {
    return ApiClient.get<PackageConditionsModel[]>(
      'admin/packageConditions/all-packageConditions',
    );
  }

  public static createPackageCondition(model: Partial<PackageConditionsModel>) {
    return ApiClient.post<Partial<PackageConditionsModel>>('admin/packageCondition', model);
  }

  public static fetchOrderStatus() {
    return ApiClient.get<{ id: string; name: string }[]>(
      'admin/order-statuses',
    );
  }

  public static fetchCountries() {
    return ApiClient.get<{ countryName: string; id: string }>(
      'warehouse/countries',
    );
  }
}
