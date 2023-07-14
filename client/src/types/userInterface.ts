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


  export interface ticketBookingCreationInterface{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        userId: string;
        ticketCount: number;
        eventId:string
  }