import { Request, Response } from "express";
import { MessageModel } from "src/models/message";

const sendMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { senderId, receiverId, messageText } = req.body;

    const msg = await MessageModel.create({
      senderId,
      receiverId,
      messageText,
    });

    return res.json(msg);
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (req: Request, res: Response): Promise<any> => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await MessageModel.find({
      $or: [
        {
          senderId: senderId,
          receiverId: receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    });
    if (!messages) {
      return res.json({
        error: "no messages found",
      });
    } else {
      return res.json({ messages: messages });
    }
  } catch (error) {
    console.log(error);
  }
};

export { sendMessage, getMessages };
