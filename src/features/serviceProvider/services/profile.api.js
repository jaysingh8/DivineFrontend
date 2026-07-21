import axios from "axios";

const authApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// now accepts FormData directly instead of a plain object with base64 image
export async function profile(formData) {
    const response = await authApiInstance.post("/api/profile", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function portfolio(formData) {
    const response = await authApiInstance.post("/api/portfolio", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function getProfile() {
    const response = await authApiInstance.get("/api/getProfile")
    return response.data
}

// now supports pagination
export async function getAllProfile(page = 1, limit = 20) {
     const response = await authApiInstance.get("/api/", { params: { page, limit } })
     return response.data
}

export async function profileDetails(profileId){
    const response = await authApiInstance.get(`/api/profile/${profileId}`)
    return response.data
}

export async function isActive({ latitude, longitude } = {}){
    const response = await authApiInstance.patch("/api/isActive", { latitude, longitude })
    return response.data
}

export default authApiInstance