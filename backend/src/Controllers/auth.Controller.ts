import { Request, Response } from "express";
import { registerDetails, loginDetails } from "../Interfaces/user.Interface";
import { userModel } from "../Models/user.Model";
import { MongoError } from "../Interfaces/mongoError";

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

// Register a user
export const registerUser = (async (req: Request, res: Response) => {
    try {
        const user: registerDetails = req.body;

        await userModel.create({
            email: user.email,
            password: user.password
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

        const isPassword = User.password === user.password;

        if (!isPassword) {
            return res.status(202).json({
                success: false,
                data: {
                    errorMsg: "Invalid password"
                }
            })
        }

        res.status(200).json({
            success: true,
            data: {
                successMsg: "Login successful"
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