import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

const auth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        
        if(!token){
            res.status(400).json({message: "No Token"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded._id).select("-password");

        if(!user) {
            res.status(400).json({message: "Invalid Token, authorization failed !"});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message: "error processing tokens"});
    }
};

export {auth};

