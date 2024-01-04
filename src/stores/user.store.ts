import { reactive } from 'vue';

import AuthService from '@/services/AuthService/AuthService';
import UserService from '@/services/UserService/UserService';

import type { UserDetails } from '@/types/user';

type UserStore = {
  loading: boolean;
  user: UserDetails | null;
  loadUser: () => Promise<unknown>;
};

const userStore = reactive<UserStore>({
  loading: true,
  user: null,

  loadUser: async () => {
    try {
      userStore.user = await UserService.getUserDetails();
    } catch (error) {
      AuthService.logout();
    } finally {
      userStore.loading = false;
    }
  },
});

export default userStore;
