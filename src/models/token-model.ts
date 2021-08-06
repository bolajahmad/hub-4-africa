export interface TokenDetailsModel {
  refreshToken: string;
  token: string;
  tokenExpiryTime: string;
  updatedAt: string;
}

export interface CreateAdminModel {
  fullName: string;
  email: string;
  warehouseId: string;
  phoneNumber?: string;
  password?: string;
}
