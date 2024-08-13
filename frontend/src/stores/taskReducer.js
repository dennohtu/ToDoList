// taskReducer.js
import { ADD_TASKS, GET_TASKS } from './actions';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASKS:
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
