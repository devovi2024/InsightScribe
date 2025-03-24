import express from "express";
import { getSubcategories, createSubcategory } from "../controllers/subcategory.controller.js";

const router = express.Router();

router.get("/", getSubcategories);
router.post("/", createSubcategory);

export default router;
