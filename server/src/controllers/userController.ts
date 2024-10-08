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

export { getUserData };
