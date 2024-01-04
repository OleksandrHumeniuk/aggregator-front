export type Tracking = {
  id: string;
  trackingNumber: string;
  aftershipId: string;
};

export type TrackingCheckpoint = {
  slug: string;
  location: string;
  message: string;
  checkpointTime: string;
};

export type TrackingResponse = Tracking & {
  receiverCountry: string;
  senderCountry: string;
  checkpoints: TrackingCheckpoint[];
};
