import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please add a first name"],
  },
  lastName: {
    type: String,
    required: [true, "please add a first name"],
  },
  email: {
    type: String,
    required: [true, "please add a first name"],
    unique: true,
  },
  password: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  organizations: {
    type: Array,
  },
  phoneNumber: {
    type: Number,
  },
  website: {
    type: String,
  },
  status: {
    type: String,
    default:'active'
  },
  joinedOn: {
    type: Date,
    default:new Date().toISOString()
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  likedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = model("User", userSchema, "users");
export default User;
