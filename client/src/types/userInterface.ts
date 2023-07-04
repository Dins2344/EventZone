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