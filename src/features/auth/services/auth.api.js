import axios from "axios";

const authApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function register({email,password,contact,fullname,isGetter}) {
    const response = await authApiInstance.post("/api/auth/register",{
        email,
        password,
        contact,
        fullname,
        isGetter
    })
    return response.data
}


export async function login({email,password}) {
    const response = await authApiInstance.post("/api/auth/login",{
        email,
        password
    })
    return response.data
}

export async function  getMe() {
    const response = await authApiInstance.get("/api/auth/getMe")
    return response.data
    
}
export default authApiInstance;