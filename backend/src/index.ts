import mongoose from "mongoose";
import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.Routes";
import bodyParser from 'body-parser'
import cors from 'cors'

import TaskRoutes from './routes/routes.tasks'

dotenv.config();


const app = express();

app.use(json());
app.use('/api/user', authRoutes);
app.use("/api/tasks", TaskRoutes);

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
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))



app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}`)
})
