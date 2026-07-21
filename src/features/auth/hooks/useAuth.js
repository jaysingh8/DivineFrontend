import { setLoading, setUser } from "../states/auth.slice.js"

import { getMe, login, register } from "../services/auth.api.js"
import { useDispatch } from "react-redux"


export const useAuth = () => {
    const dispatch = useDispatch()
    
    async function handleRegister({ email, password, contact, fullname, isGetter = false }) {
        try {
            dispatch(setLoading(true))

            const data = await register({ email, password, contact, fullname, isGetter })
            dispatch(setUser(data.user))
            return data.user
        } catch (error) {
            console.error("register failed", error);
            throw error;
        }
        finally{
           dispatch(setLoading(false))
        }
    }

    async function  handleLogin({email,password}) {
        
        try {
            dispatch(setLoading(true))

            const data = await login({email,password})
            dispatch(setUser(data.user))
            return data.user
        } catch (error) {
            console.error("login failed", error);
            throw error;
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try {
            dispatch(setLoading(true))
            const data = await getMe();
            dispatch(setUser(data.user))
            return data.user
        } catch (error) {
            throw error
        }finally{
            dispatch(setLoading(false))
        }
    }
    return {handleRegister , handleLogin , handleGetMe}
}

