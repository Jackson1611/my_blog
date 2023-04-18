import { Request, Response, RequestHandler } from "express";
import { IBlog } from "./../types/blog";
import Blog from "./../models/blog";

const getBlogs: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs: IBlog[] = await Blog.find({});
    res.status(200).json({ blogs });
  } catch (error) {
    throw error;
  }
};

const addBlogs: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  
    const title = req.body.title;
    const author= req.body.author;
    const url= req.body.url;
    const likes= req.body.likes;
    try {
    const newblog = await Blog.create({
      title: title,
      author: author,
      url: url,
      likes: likes
  });
  res.status(201).json({ newblog });
    } catch (error) {
      throw error;
    }
  };


export { getBlogs, addBlogs };
