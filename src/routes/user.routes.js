import { Router } from "express";
import {forgetPassword, resetPassword, uploadAvatar} from "../controllers/user.controller";
import {upload} from "../middlewares/multer.js";
import {auth} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/forget-password", forgetPassword);
router.put("/reset-password", resetPassword);

router.put("/avatar", async (req, res) => {
    const auth = await auth(req, res);
    if(!auth){return}

    upload.single("avatar")(req, res, ()=> {
        uploadAvatar(req, res);
    });
});

export default router;