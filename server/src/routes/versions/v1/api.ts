import express from "express";
import postsRouter from "../../posts/posts.router";
import authRouter from "../../auth/auth.router";

const api = express.Router();

api.use("/posts", postsRouter); //middleware to catch all posts requests
api.use("/auth", authRouter);
export default api;
