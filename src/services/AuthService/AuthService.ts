import ServiceAPI from '../index';
import userStore from '@/stores/user.store';

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './AuthService.types';

class AuthService extends ServiceAPI {
  public static async register(name: string, email: string, password: string) {
    const data = await this.post<RegisterRequest, RegisterResponse>('/auth/register', {
      name,
      email, //
      password,
    });

    localStorage.setItem('token', data.token);
  }

  public static async login(email: string, password: string) {
    const data = await this.post<LoginRequest, LoginResponse>('/auth/login', {
      email, //
      password,
    });

    localStorage.setItem('token', data.token);
  }

  public static logout() {
    localStorage.removeItem('token');
    userStore.user = null;
  }
}

export default AuthService;
