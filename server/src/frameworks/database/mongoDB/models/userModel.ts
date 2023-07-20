import mongoose,{Schema,model} from "mongoose";

const userSchema = new Schema(
    {
        firstName:{
            type:String,
            required:[true,"please add a first name"]
        },
        lastName:{
            type:String,
            required:[true,"please add a first name"]
        },
        email:{
            type:String,
            required:[true,"please add a first name"],
            unique:true
        },
        password:{
            type:String,
        },
        profileImage:{
            type:String
        },
        organizations:{
            type:Array
        },
        status:{
            type:Boolean
        },
        phoneNumber:{
            type:Number
        },
        website:{
            type:String
        },
    }
)

const User = model('User',userSchema,'users')
export default User