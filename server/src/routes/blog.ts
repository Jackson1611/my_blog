import { Router } from "express"
import { getBlogs } from "../controllers/blogs"

const router: Router = Router();

router.get("/", getBlogs);

export default router