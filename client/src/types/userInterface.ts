export interface createUserInterface{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface loginUserInterface{
    email:string,
    password:string
}

export interface LoggedUserInterface {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    __v: number
    organizations: string[]
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


  export interface ticketBookingCreationInterface{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        userId: string;
        ticketCount: number;
        eventId:string
  }
  export interface RegisteredBookingInterface{
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
    status:string
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
      endDate:string
      endTime:string
      category:string
      addressLine1:string
      addressLine2:string
      addressLine3:string
    };
    eventId: string;
    ticketCount: number;
    userId: string;
    _id: string;
    status:string
    QRCodeLink:string
  }