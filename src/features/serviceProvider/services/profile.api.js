import axios from "axios";

const authApiInstance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  withCredentials: true,
});

// now accepts FormData directly instead of a plain object with base64 image
export async function profile(formData) {
    const response = await authApiInstance.post("/profile", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function portfolio(formData) {
    const response = await authApiInstance.post("/portfolio", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function getProfile() {
    const response = await authApiInstance.get("/getProfile")
    return response.data
}

// now supports pagination
export async function getAllProfile(page = 1, limit = 20) {
     const response = await authApiInstance.get("/", { params: { page, limit } })
     return response.data
}

export async function profileDetails(profileId){
    const response = await authApiInstance.get(`/profile/${profileId}`)
    return response.data
}

export async function isActive({ latitude, longitude } = {}){
    const response = await authApiInstance.patch("/isActive", { latitude, longitude })
    return response.data
}

export default authApiInstance