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
  orgOwnerId:string
  orgName:string
}

export interface MediaFormInterface {
  description: string;
  videoURL: string;
  eventId: string;
}
export interface PublishFormInterface {
  eventCapacity: string | number
  ticketPrice: string
  ticketValue: string,
  eventId:string
}

export interface EventDetailsInterface {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  category: string;
  description: string;
  endDate: string;
  endTime: string;
  eventCapacity: number;
  eventName: string;
  imageURL: string[];
  orgName: string;
  orgOwnerId: string;
  organizer: string;
  organizerInfo: {
    admin: string[]; // Update this with the appropriate type if available
    orgName: string;
    orgType: string;
    ownerId: string;
    userId: string;
  };
  registeredTime: string;
  startDate: string;
  startTime: string;
  status: string;
  ticketPrice: number;
  ticketSold: number;
  ticketValue: string;
  videoURL: string;
  _id: string;
}


export interface RegisteredOrganization {
  _id: string
  userId: string;
  orgName: string;
  orgType: string;
  ownerId: string;
  admin: string[]; // Assuming admin is an array of user IDs (string)
  logo:string,
  __v: number;
  country:string
}
