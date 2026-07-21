import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:"auth",
    initialState :{ 
        user:null,
        loading:false
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setLoading,setUser} =authSlice.actions
export default authSlice.reducer