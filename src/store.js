import { configureStore } from "@reduxjs/toolkit";
import reducer from "./components/feedbacks-list/feedbacksSlice";

const stringMiddleware =() => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action);
}

const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;