import type { User, UserDetails } from '@/types/user';

export type GetUserDetailsResponse = UserDetails;

export type FavoriteQueryRequest = {
  queryId: string;
  value: boolean;
};

export type FavoriteQueryResponse = User;

export type FavoriteTrackingRequest = {
  trackingId: string;
  value: boolean;
};

export type FavoriteTrackingResponse = User;
