import { ApiClient } from '../api';
import { AuthenticatedUser, LoginModel, ResetPasswordModel } from '../models';

export class AuthService {
  public static login(model: LoginModel) {
    return ApiClient.post<LoginModel, AuthenticatedUser>('admin/sign-in', model);
  }

  public static verifyEmail(model: { email: string }) {
    return ApiClient.post<{ email: string }, never>(
      'admin/forgot-password',
      model,
    );
  }

  public static resetPassword(model: ResetPasswordModel) {
    return ApiClient.put<ResetPasswordModel, never>(
      'admin/reset-password',
      model,
    );
  }

  public static refreshToken() {
    return ApiClient.get('refresh-token');
  }
}
