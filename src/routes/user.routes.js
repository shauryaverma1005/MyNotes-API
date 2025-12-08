import { Router } from "express";
import {forgetPassword, resetPassword} from "../controllers/user.controller";

const router = Router();

router.post("/forget-password", forgetPassword);
router.put("/reset-password", resetPassword);

export default router;