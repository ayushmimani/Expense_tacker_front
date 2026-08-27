import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   
    name:"user",
    initialState:{
        data:null,
        loading:true
    },
    reducers:{
        adduser:(state,action)=>{
            state.data=action.payload;
            state.loading=false
        },
        removeuser:(state)=>{
            state.data=null;
             state.loading=true
        }
    }

})

export const  {adduser,removeuser} = userSlice.actions;
export default userSlice.reducer;