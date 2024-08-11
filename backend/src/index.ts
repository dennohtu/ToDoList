import mongoose from "mongoose";
import express, { json } from "express";
import dotenv from "dotenv";

import bodyParser from 'body-parser'
import cors from 'cors'
import authRoutes from "./Routes/auth.Routes";
import TaskRoutes from "./Routes/routes.tasks";



dotenv.config();


const app = express();

app.use(json());

const mongoString:string = process.env.MONGO_URL as string
mongoose.connect(mongoString)
const database = mongoose.connection
database.on("error", (error) => {
    console.error(error)
})

database.once("connected", () => {
    console.log("Database connected")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.use(bodyParser.json({limit: '50mb'}))
app.use("/api/user", authRoutes);
app.use("/api/tasks", TaskRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}`)
})
