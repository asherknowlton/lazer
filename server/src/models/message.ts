import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: String,
    receiverId: String,
    message: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

export { MessageModel };
