import { Request, Response, RequestHandler } from "express";
import { IBlog } from "./../types/blog";
import Blog from "./../models/blog";
import mongoose from "mongoose";
import createHttpError from "http-errors";


const getBlogs: RequestHandler = async (
  req: Request, 
  res: Response): 
  Promise<void> => {
  try {
    const blogs: IBlog[] = await Blog.find({});
    res.status(200).json({ blogs });
  } catch (error) {
    throw error;
  }
};

const getBlog: RequestHandler = async (
  req: Request, 
  res: Response
  ): Promise<Response<any, Record<string, any>> | void> => {
  const blogId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }
    
    const blog: IBlog | null = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json({ message: "Blog retrieved successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const addBlogs: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const title = req.body.title;
  const author = req.body.author;
  const url = req.body.url;
  const likes = req.body.likes;
  try {
    if (!title) {
      throw createHttpError(400, "Title is missing");
    }
    const newblog = await Blog.create({
      title: title,
      author: author,
      url: url,
      likes: likes
    });
    res.status(201).json({ newblog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlog: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const blogId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid blog ID");
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      throw createHttpError(404, "Blog not found");
    }

    res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlog: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const blogId = req.params.id;
  const updates = req.body;
  try {
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid blog ID");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updates, {
      new: true,
    });

    if (!updatedBlog) {
      throw createHttpError(404, "Blog not found");
    }

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { getBlogs, getBlog , addBlogs, deleteBlog, updateBlog  };
