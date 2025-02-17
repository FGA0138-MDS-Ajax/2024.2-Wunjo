import { IAuthService } from '@/interfaces/http';
import { api } from '../api';

const PREFIX = '/student/auth';

export const AuthService = {
  login: async (body: IAuthService.Login.Request) => {
    return api.post<IAuthService.Login.Response>(`${PREFIX}/login`, body);
  },

  register: async (body: IAuthService.Register.Request) => {
    return api.post(`${PREFIX}/register`, body);
  },

  me: async (token?: string) => {
    const result = api.get<IAuthService.Me.Response>(`/student/me`, {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    });
    return result;
  },

  requestRecoveryPasswordCode: async (
    body: IAuthService.RequestRecoveryPasswordCode.Request,
  ) => {
    return api.post<IAuthService.RequestRecoveryPasswordCode.Response>(
      `${PREFIX}/forgot-password/request-code`,
      body,
    );
  },

  confirmRecoveryCode: async (
    body: IAuthService.ConfirmRecoveryCode.Request,
  ) => {
    return api.post<IAuthService.ConfirmRecoveryCode.Response>(
      `${PREFIX}/forgot-password/confirm-code`,
      body,
    );
  },

  sendToken: async (
    body: { token: string; }
  ) => {
    return api.post(`${PREFIX}/send-token`, body);
  },

  changePassword: async (body: IAuthService.ChangePassword.Request) => {
    return api.post(`${PREFIX}/forgot-password/change-password`, body);
  }
};