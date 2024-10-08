import express from "express";
import { sendMessage, getMessages } from "src/controllers/messageController";

const router = express.Router();

router.post("/api/send_message", sendMessage);
router.get("/api/get_messages", getMessages);

export default router;
