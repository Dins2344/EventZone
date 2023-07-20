type FileArray = {
  [index: number]: File;
};
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
}
export interface RegisteredEventInterface {
  _id: string;
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
  __v: number;
  videoURL: string;
  description: string;
  imageURL:Array<string>;
  eventCapacity: string;
  ticketPrice: number;
  ticketValue: string;
  status:string
  orgOwnerId:string
  registeredTime:string
  orgName:string
  ticketSold:number
}
export interface mediaFormInterface {
  videoURL: string;
  description: string;
  // images:FileArray
}

export interface MediaFormDataToSend {
  description: string;
  videoURL: string;
  images: File[];
}

export interface PublishFormDataInterface {
  eventCapacity: string;
  ticketPrice: string;
  ticketValue: string;
  eventId: string;
}

export interface OrganizationInterface {
  _id: string;
  userId: string;
  orgName: string;
  orgType: string;
  ownerId: string;
  admin: Array<string>;
  status: boolean;
  imageURL: string;
}
