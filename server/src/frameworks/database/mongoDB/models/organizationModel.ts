import { Schema,model } from "mongoose";

const organizationSchema = new Schema({
    userId:{
        type:String,
        required:[true,"please add userID"]
    },
    orgName:{
        type:String,
        required:[true,'please add organization name'],
        unique:true
    },
    orgType:{
        type:String,
        required:[true,'please add organization type']
    },
    ownerId:{
        type:String
    },
    admin:{
        type:Array
    },
    status:{
        type:Boolean
    },
    logo:{
        type:String
    },
    country:{
        type:String
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    ]

})

const Organization = model('Organization',organizationSchema,'organizations')

export default Organization