import jwt from "jsonwebtoken";

export const generateToken = async (userID)=>{
    return jwt.sign({userID},
        process.env.SECRET_KEY,
        {expiresIn: "7d"}
)};

