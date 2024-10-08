import express from "express";
import {
  registerUser,
  loginUser,
  getUserFromJwt,
} from "src/controllers/authController";

const router = express.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/me", getUserFromJwt);

export default router;
