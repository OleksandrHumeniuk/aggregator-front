import ServiceAPI from '../index';

import type {
  GetUserDetailsResponse,
  FavoriteQueryResponse,
  FavoriteQueryRequest,
  FavoriteTrackingRequest,
  FavoriteTrackingResponse,
} from './UserService.types';

class UserService extends ServiceAPI {
  public static getUserDetails() {
    return this.get<GetUserDetailsResponse>('/user');
  }

  public static favoriteQuery(queryId: string, value: boolean) {
    return this.post<FavoriteQueryRequest, FavoriteQueryResponse>('/user/favorite/query', {
      queryId,
      value,
    });
  }

  public static favoriteTracking(trackingId: string, value: boolean) {
    return this.post<FavoriteTrackingRequest, FavoriteTrackingResponse>('/user/favorite/tracking', {
      trackingId,
      value,
    });
  }
}

export default UserService;
