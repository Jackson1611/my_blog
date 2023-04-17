import { Response, Request } from "express"
import { IBlog } from "./../types/blog";
import Blog from "./../models/blog"

const getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const blogs: IBlog[] = await Blog.find({})
      res.status(200).json({ blogs })
    } catch (error) {
      throw error
    }
  }
  export { getBlogs };