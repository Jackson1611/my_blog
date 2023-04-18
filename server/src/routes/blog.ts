import { Router } from "express"
import { getBlogs, addBlogs } from "../controllers/blogs"

const router: Router = Router();

router.get("/", getBlogs);
router.post("/", addBlogs);

export default router