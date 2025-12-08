import { User } from "../models/user.model.js";
import crypto from "crypto";

// Forget password controller - create reset password url
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    res.json({
      message: "reset link generated",
      resetURL,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Reset password url - reset password in database 
const resetPassword = async () => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.fin
    dOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "invalid or expiry token" });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { forgetPassword, resetPassword};