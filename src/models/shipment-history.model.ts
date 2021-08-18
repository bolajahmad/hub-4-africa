import { WarehouseModel } from '.';

export type ShipmentProgressType =
  | 'INPROGRESS'
  | 'RECEIVED'
  | 'READY'
  | 'DELIVERED';

export interface BaseOrderModel {
  createdAt: string;
  id: string;
  pricePerKG: number;
  updatedAt: string;
}

export interface PackageConditions extends BaseOrderModel {
  packageConditionName: string;
}

export interface MeansofTransportation extends BaseOrderModel {
  meansOfTransportation: string;
}

export interface OrdersModel {
  id: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  packageSize: number;
  note: string;
  pickupAddress: string;
  pickupState: string;
  pickupLocalGovt: string;
  completed: boolean;
  cost: number;
  orderStatus: number;
  paymentStatus: number;
  createdAt: string;
  updatedAt: string;
  meansOfTransportation: MeansofTransportation;
  packageConditions: PackageConditions[];
  warehouse: WarehouseModel;
}
