import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

// Register user route
router.post("/register", registerUser);

// Login user route
router.post("/login", loginUser);

// User Info
router.get("/profile", auth, getProfile)

export default router;