
type FileArray = {
    [index: number]: File;
  };
export interface BasicFormInterface{
    eventName: string,
    organizer: string,
    category: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
}
export interface mediaFormInterface {
    videoURL:string,
    description:string,
    // images:FileArray
  }

export interface MediaFormDataToSend {
    description: string;
    videoURL: string;
    images: File[];
  }

export interface OrganizationInterface{
    _id:string,
    userId:string,
    orgName:string,
    orgType:string,
    ownerId:string,
    admin:Array<string>,
    status:boolean,
    imageURL:string
}