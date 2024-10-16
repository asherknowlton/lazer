import express from "express";
import { getUserData, searchForUsers } from "src/controllers/userController";

const router = express.Router();

router.get("/api/get_user_data", getUserData);
router.get("/api/search_for_users", searchForUsers);

export default router;
