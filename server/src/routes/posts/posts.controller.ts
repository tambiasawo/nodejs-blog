import mongoose from "mongoose";
import Post from "../../models/Posts.model";
import { Request, Response, NextFunction } from "express";

export const getAllPosts = async (req: Request, res: any) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = 10;
    const count = await Post.countDocuments();
    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .limit(perPage)
      .skip(perPage * page - perPage)
      .exec();
    if (!posts) throw new Error("Could not fetch posts");
    return res.status(200).json({ posts, count, page });
  } catch (e) {
    return res
      .status(500)
      .json(e instanceof Error ? e.message : "Sth undexpected happened");
  }
};

export const getPost = async (req: Request, res: any) => {

  try {
    const id = req.params.id;
    const objectId = new mongoose.Types.ObjectId(id);

    const [post] = await Post.aggregate([{ $match: { _id: objectId } }]).exec();
    if (!post) throw new Error("Could not fetch post");
    return res.status(200).json(post);
  } catch (e) {
    return res
      .status(500)
      .json(e instanceof Error ? e.message : "Sth undexpected happened");
  }
};

// controllers/posts.controller.ts

export const addPost = async (req: Request, res: any, next: NextFunction) => {
  const { title, body } = req.body;
  // Validate request body
  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title and body are both required.",
    });
  }

  try {
    // Create and save the new post
    const newPost = await Post.create({
      title: title.trim(),
      body: body.trim(),
    });

    // Return the created post
    return res.status(201).json(newPost);
  } catch (err) {
    // Pass errors to your global error handler
    next(err);
  }
};

export const findPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { searchTerm } = req.body;
  if (!searchTerm) {
    return res
      .status(400)
      .json({ error: "You must provide a searchTerm in the body." });
  }

  const sanitized = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(sanitized, "i") } },
        { body: { $regex: new RegExp(sanitized, "i") } },
      ],
    });

    if (posts.length > 0) {
      // <-- send a JSON response with the found posts
      return res.status(200).json({ posts });
    }

    return res
      .status(404)
      .json({ error: "No posts matched your search criteria." });
  } catch (err) {
    next(err);
  }
};
