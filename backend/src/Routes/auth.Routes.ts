import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/auth.Controller";

const authRoutes = Router();

authRoutes.post('/user/register', registerUser);
authRoutes.post('/user/login', loginUser);

export default authRoutes;