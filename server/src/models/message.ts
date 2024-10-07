import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: String,
    receiverId: String,
    messageText: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

export { MessageModel };
