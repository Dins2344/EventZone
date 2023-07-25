import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  addressLine1: {
    type: String,
    requiered: [true, "please add address line 1"],
  },
  addressLine2: {
    type: String,
  },
  city: { type: String, required: [true, "please add city"] },
  country: { type: String, required: [true, "please add country"] },
  pin: { type: String, required: [true, "please add pin"] },
  state: { type: String, required: [true, "please add state"] },
  wAddressLine1: { type: String },
  wAddressLine2: { type: String },
  wCity: { type: String },
  wCountry: { type: String },
  wPin: { type: String },
  wState: { type: String },
  userId: { type: String },
});

const Address = model("Address", addressSchema, "address");

export default Address;
