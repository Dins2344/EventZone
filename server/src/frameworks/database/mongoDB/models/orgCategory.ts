
import mongoose,{Schema,model} from "mongoose";

const orgCategorySchema = new Schema(
    {
        categoryName:{
            type:String,
            required:[true,'please add a category name'],
            unique: true
        },
        subCategoryName:{
            type:String
        },
        description:{
            type:String,
            required:[true,'please add description']
        }
    }
)

const OrganizationCategory = model('OrganizationCategory',orgCategorySchema,'organizationCategory')
export default OrganizationCategory