import express from "express";
import {
  signInController,
  signUpController,
  currentUserController,
  SignOutController,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signUpController);
authRouter.post("/signin", signInController);
authRouter.get("/me", currentUserController);
authRouter.post("/signout", SignOutController);
export default authRouter;
