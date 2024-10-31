import express from "express";
import {
  getUserData,
  searchForUsers,
  addUserToFriends,
  getUsersFriends,
} from "src/controllers/userController";

const router = express.Router();

router.get("/api/get_user_data", getUserData);
router.get("/api/search_for_users", searchForUsers);
router.post("/api/add_user_to_friends", addUserToFriends);
router.get("/api/get_users_friends", getUsersFriends);

export default router;
