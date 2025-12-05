import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

// User Register Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists !" });
    }

    const user = await User.create(name, email, password);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login Controller
const loginUser = async () => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await User.matchPassword(password))) {
      res.status(400).json({ message: "email or password is incorrect" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {registerUser, loginUser};