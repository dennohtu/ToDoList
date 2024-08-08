import Joi = require("joi")
import sendResponse from "../utils/sendResponse";
import {Request, Response} from 'express'
import Task from "../models/models.tasks";

const schema = Joi.object({
    title: Joi.string().alphanum().min(1).max(30).required(),
    status: Joi.string().valid("new", "ongoing", "completed")
})


export const createTask = async (req: Request, res: Response) => {

    const data = req.body;

    try {
        const {error} = schema.validate(data)
    if(error) {
        sendResponse(res, false, error.message)
        return
    }

    const userid = req.userid
    if(!userid) { 
        sendResponse(res, false, "Not authenticated")
        return
    }

    data.userId = userid

    const task = await Task.create(data)
    if(task) {
        sendResponse(res, true, task.toJSON())
        return
    }

    sendResponse(res, false, "An error occured while saving task. Please try again")
    } catch (err: any) {
        console.error(err)
        sendResponse(res, false, err.message)
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const userid = req.userid
        if(!userid) {
            sendResponse(res, false, "Not authenticated")
            return
        }

        const tasks = await Task.find({userId: userid})

        sendResponse(res, true, tasks)
    } catch(err: any) {
        console.error(err)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const taskid = req.params.id

        const {error} = schema.validate(req.body)

        if(error) {
            sendResponse(res, false, error.message)
            return
        }

        const task = await Task.findOneAndUpdate({_id: taskid}, req.body, {new: true})

        if(!task) {
            sendResponse(res, false, "Could not find task to update")
            return
        }
        sendResponse(res, true, task.toJSON())
    } catch (err: any) {
        console.log(err)
        sendResponse(res, false, err.message)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskid = req.params.id

        const task = await Task.findByIdAndDelete(taskid)

        if(!task) {
            sendResponse(res, false, "Could not find task to delete")
            return
        }

        sendResponse(res, true, task.toJSON())
    } catch (err: any) {
        console.log(err)
        sendResponse(res, false, err.message)
    }
}