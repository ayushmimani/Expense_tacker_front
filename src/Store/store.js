import { configureStore } from "@reduxjs/toolkit";
import expensereducer from "../Slice/ExpenseSlice"

export const store = configureStore({
    reducer:{
        'expense':expensereducer
    }
})

