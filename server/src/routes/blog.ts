import { Router } from "express";
import { getBlogs, getBlog, addBlogs, deleteBlog, updateBlog } from "../controllers/blogs";

const router: Router = Router();

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", addBlogs);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);
export default router;
