import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

// Register user route
router.post("/register", registerUser);

// Login user route
router.post("/login", loginUser);

export default router;