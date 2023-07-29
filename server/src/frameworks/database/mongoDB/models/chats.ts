import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    orgName: { type: String },
    chatName: {
      type: String,
      required: [true, "please add email"],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessages: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema, "chat");

export default Chat;
