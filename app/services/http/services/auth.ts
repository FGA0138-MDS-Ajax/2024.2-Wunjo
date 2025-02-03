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
    return api.get<IAuthService.Me.Response>(`/student/me`, {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    });
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

  changePassword: async (body: IAuthService.ChangePassword.Request) => {
    return api.post(`${PREFIX}/forgot-password/change-password`, body);
  }
};
