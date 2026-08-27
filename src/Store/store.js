import { configureStore } from "@reduxjs/toolkit";
import expensereducer from "../Slice/ExpenseSlice"
import userreducer from "../Slice/UserSlice";
export const store = configureStore({
    reducer:{
        'expense':expensereducer,
        'user':userreducer
    }
})

