export interface createUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface RegisteredUserInterface{
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  _id?:string
  organizations?:string[]
  phoneNumber:string
  profileImage?:string
  website:string
  images:[]
  __v?:number

}

export interface loginUserInterface {
  email: string;
  password: string;
}

export interface LoggedUserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  __v: number;
  organizations: string[];
}

export interface EventDetailsInterface {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city:string
  state:string
  agenda:string
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

export interface ticketBookingCreationInterface {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userId: string;
  ticketCount: number;
  eventId: string;
  paymentType: string;
  totalAmount: number;
  orgOwnerId: string;
  organizationId: string;
}
export interface RegisteredBookingInterface {
  bookingTime: string;
  contactInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  eventId: string;
  ticketCount: number;
  userId: string;
  _id: string;
  status: string;
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

export interface Bookings {
  bookingTime: string;
  contactInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  event: {
    eventName: string;
    imageURL: string[];
    organizer: string;
    startDate: string;
    startTime: string;
    ticketValue: string;
    endDate: string;
    endTime: string;
    category: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    orgName:string
  };
  eventId: string;
  ticketCount: number;
  userId: string;
  _id: string;
  status: string;
  QRCodeLink: string;
  paymentType: string;
  totalAmount: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage:string
  };
}

export interface ProfileContactInfo{
  firstName:string
  lastName:string
  phoneNumber:string
  images:File|undefined[]
}


export interface CompleteRegisteredChatInterface{
  chatName: string
  createdAt: string
  orgName: string
  updatedAt: string
  logo:string
  users: RegisteredUserInterface[]
  __v: number
  _id:string
}

export interface CompleteMessageInterface {
  chat: {
    chatName: string;
    createdAt: string;
    orgName: string;
    updatedAt: string;
    logo: string;
    users: string[];
    __v: number;
    _id: string;
  },
  content: string
  createdAt: string
  sender: {
    _id: string
    firstName: string
    email: string
    profileImage: string
  },
  updatedAt: string
  __v: number
  _id:string
}
