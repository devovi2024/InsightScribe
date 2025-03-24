import express from "express";
import { 
  getPosts, 
  createPost, 
  getPostsBySubcategory, 
  getPostsBySubcategorySlug, 
  getPost 
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/subcategory/:id/posts", getPostsBySubcategory);
router.get("/subcategory/:slug/posts", getPostsBySubcategorySlug);
router.get("/:postId", getPost);

export default router;
