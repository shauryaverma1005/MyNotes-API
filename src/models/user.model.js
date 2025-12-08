import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    avatar: {
        public_id: String,
        url: String,
    }
}, {timestamps: true});

// pre-middleware to encrypt password before saving
userSchema.pre("save", async function(){
    if(!this.isModified("password")){ return }

    this.password = await bcrypt.hash(this.password, 12);
})

// Method to match password entered
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

// Generate password token
userSchema.methods.getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Reset pssword token
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    // Reset Password expiry
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

export const User = mongoose.model("User", userSchema);

