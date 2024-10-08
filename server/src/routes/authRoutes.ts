import express from "express";
import {
  registerUser,
  loginUser,
  sendMessage,
  getMessages,
  getUserData,
  getUserFromJwt,
} from "src/controllers/authController";

const router = express.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.post("/api/send_message", sendMessage);
router.get("/api/get_messages", getMessages);
router.get("/api/get_user_data", getUserData);
router.get("/api/me", getUserFromJwt);

export default router;
