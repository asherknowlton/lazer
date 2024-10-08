import express from "express";
import { getUserData } from "src/controllers/userController";

const router = express.Router();

router.get("/api/get_user_data", getUserData);

export default router;
