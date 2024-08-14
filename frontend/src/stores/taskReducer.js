import { createSlice } from '@reduxjs/toolkit';
import { getAllTasks, addTasksData,updateTaskData } from './actions';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
     updateLocalTasks: (state, action) => {
    state.tasks = action.payload; // This updates the local state
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTasksData.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskData.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(task => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        console.error('Failed to fetch tasks:', action.payload);
      })
      .addCase(updateTaskData.rejected, (state, action) => {
        console.error('Failed to update task:', action.payload);
      });
  },
});
export const { updateLocalTasks } = taskSlice.actions;
export default taskSlice.reducer;
