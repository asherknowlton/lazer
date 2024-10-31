import { Request, Response } from "express";
import { UserModel } from "src/models/user";

const getUserData = async (req: Request, res: Response): Promise<any> => {
  try {
    const { _id } = req.query;
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    } else {
      return res.json({ user });
    }
  } catch (error) {
    console.log(error);
  }
};

const searchForUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { searchTerm } = req.query;
    const users = await UserModel.find({
      // $or: [
      // {
      $text: { $search: <string>searchTerm },
      // },
      // {
      //   email: searchTerm,
      // },
      // ],
    });
    if (!users) {
      console.log("no users found");
      return res.json({
        error: "no users found",
      });
    } else {
      console.log(users);
      return res.json({ users });
    }
  } catch (error) {
    console.log(error);
  }
};

const addUserToFriends = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, newFriendId } = req.body;

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: newFriendId } }
    );

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUsersFriends = async (req: Request, res: Response): Promise<any> => {
  try {
    const { _id } = req.query;
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    } else {
      return res.json({ user });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserData, searchForUsers, addUserToFriends, getUsersFriends };
