export interface LoginModel {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface ResetPasswordModel {
  password: string;
  verificationToken: string;
  email: string;
}

export interface UserWalletDetails {
  id: string;
  balance: number;
}

export interface AuthenticatedUser {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  phoneNumber: string;
  postalCode: string;
  promoCodes: string;
  refreshToken: string;
  token: string;
  tokenExpiryTime: string;
  updatedAt: string;
  userName: string;
  wallet: UserWalletDetails;
}
