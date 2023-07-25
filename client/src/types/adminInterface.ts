

export interface adminInterface {
    email:string,
    password:string
}

export interface eventCategoryInterface{
    _id:string,
    categoryName:string,
    subCategoryName:string,
    description:string
}

export interface OrganizationCategoriesInterface{
    categoryName:string
    subCategoryName:string
    description:string
    _id:string
    __v:number,
    
}

export interface RegisteredCityInterface {
    _id:string
    cityName:string
    state:string
}
export interface CityInterface {
    cityName:string
    state:string
}