import { Schema, model } from "mongoose";

const citesSchema = new Schema({
    cityName:{
        type:String,
        required:[true,'please add email'],
        unique:true
    },
  state: {
    type: String,
  },
 
});

const Cities = model("Cities", citesSchema, "cities");

export default Cities;
