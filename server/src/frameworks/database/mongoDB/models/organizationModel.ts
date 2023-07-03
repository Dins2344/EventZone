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
    imageURL:{
        type:String
    }

})

const Organization = model('Organization',organizationSchema,'organizations')

export default Organization