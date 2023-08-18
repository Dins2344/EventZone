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
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
    default: "active",
  },
  joinedOn: {
    type: String,
    default: new Date().toDateString(),
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
