import { EventCategory,OrgCategory } from "../../components/admin_components/categories"

const CategoryManagement = ()=>{
    return (
        <>
        <div className="min-h-screen px-4">
        <EventCategory />
        <OrgCategory />
        </div>
        </>
    )
}

export default CategoryManagement