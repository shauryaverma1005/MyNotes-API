import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token, authorization failed !" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export { auth };

