import { createSlice } from "@reduxjs/toolkit";
const ExpenseSlice = createSlice({
    name:'expense',
    initialState:{
        expenses:[]
    }, 
    reducers:{
        addexpense :(state,action)=>{
                 state.expenses.push(action.payload);
        },
        udpatexpense:(state,action)=>{
        const index = state.expenses.findIndex(item=>item.id==action.payload.id);
        if(index!= 1){
            state.expenses[index]=action.payload;
        }
   
        },
        removeexpense :(state,action)=>{
                state.expenses = state.expenses.filter(item=>item.id!=action.payload)
        }
    },
})
export const  {addexpense,removeexpense,udpatexpense} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;