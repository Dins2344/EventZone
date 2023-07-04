export interface BasicFormInterface {
  eventName: string;
  organizer: string;
  category: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: string;
}

export interface MediaFormInterface {
  description: string;
  videoURL: string;
  eventId: string;
}
