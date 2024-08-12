

export const ADD_TASKS='UPDATE_TASKS';
export const updateTasks =(tasks)=>({
    type:ADD_TASKS,
    payload:tasks
})


import { createAsyncThunk } from "@reduxjs/toolkit";
export const updateTasksData =createAsyncThunk(
    
    async (tasks,thunkApi)=>{
        const response =await fetch('',{
            method :'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body :JSON.stringify(tasks),
        })
  if(!response.ok){
throw new Error('Failed to update tasks data')
  }
    }

)