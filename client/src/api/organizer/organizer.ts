import api from "../itercepters/intercepter";
import { BasicFormInterface ,MediaFormDataToSend} from "../../types/organizerInterface";
import { AxiosRequestConfig } from "axios";




export const getUsersOrganizations = async()=>{
    const data =await api.get("http://localhost:4000/organization/get-user-organizations")
    return data
}

export const getEventCategories = async()=>{
    const data = await api.get("http://localhost:4000/organization/get-all-event-categories")
    return data
}

export const addBasicEventInfo =async (data:BasicFormInterface)=>{
    const res = await api.post('http://localhost:4000/organization/add-event-basic-info',data)
    return res
}

export const addMediaEventInfo = async(data:any)=>{
    try{
        const config: AxiosRequestConfig = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
        const res =await api.post('http://localhost:4000/organization/add-event-media-info',data,config)
        console.log(res)
        return res

    }catch(error){
        console.log(error)
    }
}