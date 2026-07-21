import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name:"profile",
    initialState:{
        profile:null,
        allProfiles:[],
        loading:false
    },
    reducers:{
        setProfile:(state,action)=>{
            state.profile = action.payload
        },
        setAllProfiles:(state,action)=>{
            state.allProfiles = action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})


export const {setLoading,setProfile,setAllProfiles}= profileSlice.actions
export default profileSlice.reducer
