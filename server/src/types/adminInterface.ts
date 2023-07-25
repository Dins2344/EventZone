interface AdminInterface{
    _id:string;
    email:string;
    password:string;
}

export interface EventCategoryInterface{
    categoryName:string,
    subCategoryName:string,
    description:string
}
export interface EditEventCategoryInterface{
    id:string,
    categoryName:string,
    subCategoryName:string,
    description:string
}

export interface CityInterface{
    cityName:string
    state:string
}

export default AdminInterface;