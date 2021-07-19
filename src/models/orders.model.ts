export type OrderStatsType = 'pending' | 'fulfilled' | 'rejected' | 'transactions';

export interface OrderStatsModel {
  name: string;
  id: string;
  value: number;
  color: string;
  icon: string;
}
