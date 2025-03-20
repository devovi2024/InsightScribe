import express from "express";
import { registerUser, loginUser, getUser, logoutUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getUser);

export default router;
