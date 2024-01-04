import type { Query } from './query';
import type { Tracking } from './tracking';

export type UserTracking = Tracking & {
  isFavorite: boolean;
};

export type UserQuery = Query & {
  isFavorite: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserDetails = User & {
  queries: UserQuery[];
  trackings: UserTracking[];
};
