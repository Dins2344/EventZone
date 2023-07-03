
import mongoose,{Schema,model} from "mongoose";

const eventCategorySchema = new Schema(
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

const EventCategory = model('EventCategory',eventCategorySchema,'eventCategory')
export default EventCategory

