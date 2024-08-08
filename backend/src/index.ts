import mongoose from "mongoose";
import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.Routes";

dotenv.config();

// .env imports
const LOCAL_URI = process.env.LOCAL_URI as string;
const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.PORT as string;

const app = express();

app.use(json());
app.use('/api/user', authRoutes);

mongoose.connect(LOCAL_URI || MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
        
    });
})
.catch((error) => {
    console.log(error);
});