import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../auth.Service"

const ADD_TASKS = 'ADD_TASKS';
const GET_TASKS = 'GET_TASKS';

export { ADD_TASKS, GET_TASKS };

export const updateTasksData = createAsyncThunk(
  'tasks/updateTasks',
  async (tasks, thunkApi) => {
    const token = getToken();
    console.log(token)
    const response = await axios.put("http://localhost:5000/api/tasks/update", tasks, {
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to update tasks data');
    }
    return response.data;
  }
);

export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasks',
  async (_, thunkApi) => {
    const token = getToken();
    const response = await axios.get("http://localhost:5000/api/tasks/getAll", {
      headers: {
        Authorization: `jwt ${token}`,
      },
      
    });
    if (!response.status === 200) {
      throw new Error('Failed to get tasks data');
    }
    return response.data 
       
    
  }
);
