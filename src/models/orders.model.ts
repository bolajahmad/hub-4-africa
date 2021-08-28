export type OrderStatsType =
  | 'pending'
  | 'fulfilled'
  | 'awaitingShipment'
  | 'rejected'
  | 'transactions'
  | 'Shipped';

export interface OrderStatsModel {
  name: string;
  id: OrderStatsType;
  value: number;
  color: string;
  icon: string;
}

export interface RequestPriceEstimateModel {
  pickupState: string;
  packageConditionIds?: string[];
  packageSize: number;
  meansOfTransportationId?: string;
  warehouseId?: string;
}
