import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../auth.Service"

export const UPDATE_TASKS = 'UPDATE_TASKS';
export const GET_TASKS = 'GET_TASKS';

export const ADD_TASKS='ADD_TASKS';
export const getTasks=(tasks)=>({
  type: GET_TASKS,
  payload: tasks
})



export const addTasksData = createAsyncThunk(
  'tasks/addTasks',
  async (task, thunkApi) => {
    try {
      const token = getToken();
      const response = await axios.post("http://localhost:5000/api/tasks/create", task, {
        headers: {
          Authorization: `jwt ${token}`, 
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to add task data');
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasks',
  async (_, thunkApi) => {
    try {
      const token = getToken();
      const response = await axios.get("http://localhost:5000/api/tasks/getAll", {
        headers: {
          Authorization: `jwt ${token}`, // Ensure this matches your server's expected format
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to get tasks data');
      }
      // console.log('Fetched tasks:', response.data.data); // Correct console.log
      return response.data.data; // Return the tasks data from the response
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const updateTaskData= createAsyncThunk(
  'tasks/updateTasks',
  async(updatedTask,thunkApi)=>{
    try {
      const token = getToken();
      const response = await axios.put(
        `http://localhost:5000/api/tasks/updateMany`,
        updatedTask,
        {
          headers: {
            Authorization: `jwt ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to update task data');
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

// export default { UPDATE_TASKS, GET_TASKS ,ADD_TASKS};