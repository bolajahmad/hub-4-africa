export type ShipmentProgressType = 'INPROGRESS' | 'RECEIVED' | 'READY' | 'DELIVERED';

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
}
