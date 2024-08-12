import {configureStore} from "@reduxjs/toolkit";

const store =configureStore({

    middleware :getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[]
        }
    })
})
export default store;