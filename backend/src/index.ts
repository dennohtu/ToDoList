import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import TaskRoutes from './routes/routes.tasks'
dotenv.config()

const app = express()

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

app.use("/api/tasks", TaskRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}`)
})
