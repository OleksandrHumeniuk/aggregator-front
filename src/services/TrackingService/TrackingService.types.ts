import type { Tracking, TrackingResponse } from '@/types/tracking';

export type GetTrackingResponse = TrackingResponse;

export type CreateTrackingRequest = {
  trackingNumber: string;
};

export type CreateTrackingResponse = Tracking;
