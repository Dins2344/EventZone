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

export interface BookingCreationInterface {
    eventId:string,
    userId:string,
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