import jwt from "jsonwebtoken";

export const generateToken = (userID) => {
  return jwt.sign({ _id: userID }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

