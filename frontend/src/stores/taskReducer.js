import { createSlice } from '@reduxjs/toolkit';
import { getAllTasks, addTasksData } from './actions';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTasksData.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        console.error('Failed to fetch tasks:', action.payload);
      });
  },
});

export default taskSlice.reducer;
