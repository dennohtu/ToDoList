import { required } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
});

export const userModel = mongoose.model('user', userSchema);