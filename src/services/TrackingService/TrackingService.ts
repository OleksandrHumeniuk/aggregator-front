import ServiceAPI from '../index';

import type { GetTrackingResponse, CreateTrackingResponse, CreateTrackingRequest } from './TrackingService.types';

class TrackingService extends ServiceAPI {
  public static getTracking(trackingNumber: string) {
    return this.get<GetTrackingResponse>(`/tracking/${trackingNumber}`);
  }

  public static createTracking(trackingNumber: string) {
    return this.post<CreateTrackingRequest, CreateTrackingResponse>('/tracking', { trackingNumber });
  }
}

export default TrackingService;
