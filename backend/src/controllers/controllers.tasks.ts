import Joi = require("joi");
import sendResponse from "../utils/sendResponse";
import { Request, Response } from "express";
import Task from "../Models/models.tasks";

const schema = Joi.object({
  title: Joi.string().min(1).max(30).optional(),
  status: Joi.string().valid("new", "ongoing", "completed"),
});

export const createTask = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const { error } = schema.validate(data);
    if (error) {
      sendResponse(res, false, error.message);
      return;
    }

    const userid = req.userid;
    if (!userid) {
      sendResponse(res, false, "Not authenticated");
      return;
    }

    data.userId = userid;

    const task = await Task.create(data);
    if (task) {
      sendResponse(res, true, task.toJSON());
      return;
    }

    sendResponse(
      res,
      false,
      "An error occured while saving task. Please try again"
    );
  } catch (err: any) {
    console.error(err);
    sendResponse(res, false, err.message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userid = req.userid;
    if (!userid) {
      sendResponse(res, false, "Not authenticated");
      return;
    }

    const tasks = await Task.find({ userId: userid });

    sendResponse(res, true, tasks);
  } catch (err: any) {
    console.error(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const taskid = req.params.id;

    const { error } = schema.validate(req.body);

    if (error) {
      sendResponse(res, false, error.message);
      return;
    }

    const task = await Task.findOne({ _id: taskid });

    if (!task) {
      sendResponse(res, false, "Could not find task");
      return;
    }

    if (req.body.title) {
      if (req.body.title != task.title) {
        req.body.isEdited = true;
      }
    }

    const taskE = await Task.findOneAndUpdate({ _id: taskid }, req.body, {
      new: true,
    });

    if (!taskE) {
      sendResponse(res, false, "Could not find task to update");
      return;
    }
    sendResponse(res, true, taskE.toJSON());
  } catch (err: any) {
    console.log(err);
    sendResponse(res, false, err.message);
  }
};

export const updateMany = async (req: Request, res: Response) => {
  try {
    let list: Array<updateTask> = req.body;
    let updated: Array<Task> = [];
    list.forEach(async (taskBody) => {
      const id = taskBody.id;
      const task = taskBody.task;

      const { error } = schema.validate(task);

      if (error) {
        sendResponse(res, false, error.message);
        return;
      }

      const tf = await Task.findOne({ _id: id });

      if (!tf) {
        sendResponse(res, false, "Could not find task");
        return;
      }

      if (task.title) {
        if (task.title != task.title) {
          task.isEdited = true;
        }
      }

      let t = await Task.findOneAndUpdate({ _id: id }, task, { new: true });
      if (t) updated.push(t.toJSON());
    });

    sendResponse(res, true, updated);
  } catch (err: any) {
    console.log(err);
    sendResponse(res, false, err.message);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskid = req.params.id;

    const task = await Task.findByIdAndDelete(taskid);

    if (!task) {
      sendResponse(res, false, "Could not find task to delete");
      return;
    }

    sendResponse(res, true, task.toJSON());
  } catch (err: any) {
    console.log(err);
    sendResponse(res, false, err.message);
  }
};
