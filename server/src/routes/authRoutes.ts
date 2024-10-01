import express from "express";
import cors from "cors";
import {
  registerUser,
  loginUser,
  getProfile,
} from "src/controllers/authController";

const router = express.Router();

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/me", getProfile);

export default router;
