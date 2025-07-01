import { Request } from "express";
import UserModel from "../../models/User.model";
import bcrypt from "bcryptjs";
import jwt, { verify } from "jsonwebtoken";

export const signUpController = async (req: Request, res: any) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "Unable to create user" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    const newUser = await UserModel.create(user);

    const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY as string);
    const expiryDate = new Date(Date.now() + 3600000);

    const { password: userPassword, ...rest } = newUser;

    if (newUser)
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
          secure: process.env.NODE_ENV === "production",
          samesSite: "lax",
        })
        .status(201)
        .json({ message: "New user created", data: rest });
    throw new Error("Unable to create user");
  } catch (e) {
    return res.status(500).json({
      message: e instanceof Error ? e.message : "Something Unexpected Happened",
    });
  }
};

export const signInController = async (req: Request, res: any, next: any) => {
  const { email, password } = req.body;

  try {
    const validUser: any = await UserModel.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        message: "Incorrect credentials",
        success: false,
      });
    }
    const validPassword = bcrypt.compareSync(
      password.toString(),
      validUser.password
    );

    if (!validPassword) {
      return res.status(404).json({
        message: "Incorrect credentials",
        success: false,
      });
    } else {
      const { password, _id, ...rest }: any = validUser._doc as any;

      const token = jwt.sign(
        { id: validUser._id },
        process.env.PRIVATE_KEY as string
      );
      const expiryDate = new Date(Date.now() + 3600000);
      return res
        .cookie("access_token", token, {
          expires: expiryDate,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          samesSite: "lax",
        })
        .status(200)
        .json({ user: rest });
    }
  } catch (e) {
    next(e);
  }
};

export const currentUserController = async (
  req: Request,
  res: any,
  next: any
) => {
  try {
    const token = req.cookies.access_token; // HttpOnly cookie
    if (!token) return res.status(401).json({ error: "Not logged in" });

    const payload = verify(token, process.env.PRIVATE_KEY!) as { id: string };
    const user: any = await UserModel.findById(payload.id);

    const { _id, password, __v, ...rest } = user?._doc as any;
    return res.json({ user: rest });
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const SignOutController = (req: Request, res: any) => {
  return res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(200)
    .json({ success: true, message: "Signed out" })
    .sendStatus(204);
};
