import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    }
}, {timestamps: true});

// pre-middleware to encrypt password before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){ return next()}

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

// Method to match password entered
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);

