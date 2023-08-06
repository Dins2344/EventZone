import { Request } from "express"
export interface UserInterface{
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}

export interface CreateUserInterface{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface CreateOrganization{
    orgName:string,
    orgType:string,
    userId:string,
    ownerId:string
}

export interface OrganizationInterface extends CreateOrganization{
    _id:string,
    admin:Array<string>
}

export interface CustomRequest extends Request{
    user?:{
        Id:string;
        email:string
        role:string
    }
}

export interface RegisteredEventInterface {
    _id: string;
    eventName: string;
    organizer: string;
    category: string;
    addressLine1: string;
    addressLine2: string;
    agenda:string
    city: string;
    state:string
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
    ticketSold: number
    reviews: ReviewData[]
    avgRating: number,
    numOfReviews:number
  }

export interface BookingCreationInterface {
    eventId:string,
    userId?:string,
    bookingTime:string,
    contactInfo:object,
    ticketCount:number,
    status:string,
    QRCodeLink:string,
    paymentType:string
    totalAmount:number
    orgOwnerId: string;
    organizationId: string;
}

export interface RegisteredBookingCreationInterface {
  eventId: string;
  userId: string;
  bookingTime: string;
  contactInfo: object;
  ticketCount: number;
  status: string;
  QRCodeLink: string;
  paymentType: string;
  totalAmount: number;
  orgOwnerId: string;
    organizationId: string;
    _id: string,
    __v:number
}
export interface ticketBookingCreationInterface{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    userId: string;
    ticketCount: number;
    eventId:string,
    paymentType:string
    totalAmount:number
    orgOwnerId: string;
    organizationId: string;
  
}
export interface ProfileContactInfo{
    firstName:string,
    lastName: string,
    phoneNumber: string,       
    website: string,
    imageURL: string 
}

export interface AddressFormDataCreateInterface {
    //   homeAddress: {
        userId:string
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    pin: string;
    state: string;
    //   };
    //   workAddress: {
    wAddressLine1: string;
    wAddressLine2: string;
    wCity: string;
    wCountry: string;
    wPin: string;
    wState: string;
    //   };
  }

  export interface SearchQueryInterface extends Request {
    query:{
        searchFor:string 
        searchText:string
        city:string
        price:string
        category:string
    }
  }

  export interface  searchDataInterface {
    searchFor:string 
    searchText:string 
    city:string
    price:string
    category:string
  }

export interface CreateChatInterface {
    users: string[],
    chatName: string,
    orgName: string
    logo:string
}
  
export interface NewMessageInterface{
    sender: string
    content: string
    chat:string
  }

export interface ReviewData {
    userId: string,
    rating: number,
    comment:string
  }
  