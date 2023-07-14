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
    }
}

export interface BookingCreationInterface {
    eventId:string,
    userId:string,
    bookingTime:string,
    contactInfo:object,
    ticketCount:number

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