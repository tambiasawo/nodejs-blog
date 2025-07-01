import express from "express";

import { getAllPosts, getPost, addPost, findPost } from "./posts.controller";

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", getPost);
postsRouter.post("/add", addPost);
postsRouter.post("/search", findPost);

export default postsRouter;
