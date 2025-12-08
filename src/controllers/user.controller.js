import crypto from "crypto";
import { cloudinary } from "../config/cloudinary.js";
import { User } from "../models/user.model.js";

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

// Upload Avatar
const uploadAvatar = async (req, res)=> {
  try {
      const user = User.findOne({_id: req.user._id});

      if(!req.file){
        return res.status(404).json({message: "No file uploaded"});
      }

      //upload image to cloudinary
      const result = cloudinary.uploader.upload_stream(
        {folder: "avatars"},
        async (error, cloudResult) => {

          if(error){
            return res.status(500).json({message: "Avatar upload failed"});
          }

          if(user.avatar?.public_id){
            await cloudinary.uploader.destroy(user.avatar.public_id);
          }

          user.avatar = {
            public_id: cloudResult.public_id,
            url: cloudResult.secure_url
          }

          await user.save();

          res.json({
            message: "Avatar uploaded successfully",
            Avatar: user.avatar
          });
        }
      );
        result.end(req.file.buffer);
      
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export { forgetPassword, resetPassword, uploadAvatar};