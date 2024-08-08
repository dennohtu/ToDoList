import { Request, Response } from "express";
import { registerDetails, loginDetails } from "../Interfaces/user.Interface";
import { userModel } from "../Models/user.Model";
import { MongoError } from "../Interfaces/mongoError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const handleMongoError = ((err: MongoError) => {
    let errors: any = { email: "", password: "" }

    // Handle validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            return errors[properties.path] = properties.message;
        });
    }
    // Handle duplicate emails
    if (err.code === 11000) {
        errors.email = 'Email is already in use'
        return errors
    }

    return errors
});

// Create json web token
export const createToken = ((_id: string) => {
    const SECRET: string = process.env.SECRET as string
    const token = jwt.sign(_id, SECRET);

    return token;
});

// Register a user
export const registerUser = (async (req: Request, res: Response) => {
    try {
        const user: registerDetails = req.body;

        const hashPwd = await bcrypt.hash(user.password, 5);

        await userModel.create({
            email: user.email,
            password: hashPwd
        });

        res.status(200).json({
            success: true,
            data: {
                successMsg: "User registered successfully"
            }
        });
    } catch (error: any) {
        const data = handleMongoError(error)

        res.status(500).json({
            success: false,
            data
        })
    }
});

// Login a user
export const loginUser = (async (req: Request, res: Response) => {
    try {
        const user: loginDetails = req.body;

        const User = await userModel.findOne({ email: user.email });

        if (!User) {
            return res.status(202).json({
                success: false,
                data: {
                    errorMsg: "User not found"
                }
            })
        }

        const isPassword = await bcrypt.compare(user.password, User.password);

        if (!isPassword) {
            return res.status(202).json({
                success: false,
                data: {
                    errorMsg: "Invalid password"
                }
            })
        }

        const token = createToken(User._id.toString());

        console.log(User._id.toString());
        

        res.status(200).json({
            success: true,
            data: {
                successMsg: "Login successful",
                token
            }
        })

    } catch (error: any) {
        const data = handleMongoError(error);

        console.log(error);


        res.status(500).json({
            success: false,
            data
        });
    }
});