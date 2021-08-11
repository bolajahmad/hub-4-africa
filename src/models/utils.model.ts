import { BaseOrderModel } from './shipment-history.model';

export interface WarehouseModel extends BaseOrderModel {
  address: string;
  state: string;
}

export interface PackageConditionsModel {
  id: string;
  packageConditionName: string;
  pricePerKG: number;
}

export interface CreateWarehouse {
  id?: string;
  stateName: string;
  address: string;
  countryId: string;
  pricePerKG: number;
  createdAt?: string;
  updatedAt?: string;
}
