import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from './taskReducer';
 const rootReducer = combineReducers(
    {
        task: taskReducer,

    }
 )
 export default rootReducer;