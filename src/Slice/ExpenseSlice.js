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

        setexpense: (state,action)=>{
            state.expenses = action.payload;
        },

        udpatexpense:(state,action)=>{
        const index = state.expenses.findIndex(item=>item.id==action.payload.id);
        if(index!= 1){
            state.expenses[index]=action.payload;
        }
   
        },
        removeexpense :(state,action)=>{

                //    ids conatian array
                const ids = action.payload;
                state.expenses  = state.expenses.filter(item => !ids.includes(item._id))
        }
    },
})
export const  {addexpense,removeexpense,udpatexpense,setexpense} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;