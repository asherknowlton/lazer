import { Request, Response } from "express";
import { UserModel } from "src/models/user";
import { default as jwt } from "jsonwebtoken";
import { hashPassword, comparePasswords } from "src/helpers/auth";

const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    //name validation
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    //email validation
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is already registered",
      });
    }
    //password validation
    if (!password || password.length < 6) {
      return res.json({
        error: "password is invalid",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log("server error");
  }
};

const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    //check user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    } else {
      console.log("user found");
    }
    //check password match
    const match = user.password
      ? await comparePasswords(password, user.password)
      : false;
    if (match) {
      jwt.sign(
        { email: user?.email, id: user?._id, name: user?.name },
        process.env.JWT_SECRET!,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req: Request, res: Response): Promise<any> => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

export { registerUser, loginUser, getProfile };
