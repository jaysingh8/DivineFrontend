import { setAllProfiles, setLoading, setProfile } from "../state/profile.slice.js"
import { profile as createProfile, portfolio, getProfile, getAllProfile, profileDetails, isActive } from "../services/profile.api.js"
import { useDispatch, useSelector } from "react-redux"

export const useProfile = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector((state) => state.profile)

    // now takes a FormData object built by the caller (see Profile.jsx)
    async function handleProfile(formData) {
        try {
            dispatch(setLoading(true))
            const data = await createProfile(formData)
            dispatch(setProfile(data.data))
            return data.data
        } catch (error) {
            console.error("Profile creation failed", error);
            throw error;
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handlePortfolio(formData) {
        try {
            dispatch(setLoading(true))
            const data = await portfolio(formData)
            dispatch(setProfile(data.data))
            return data.data
        } catch (error) {
            console.error("Portfolio upload failed", error);
            throw error;
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetProfile() {
        try {
            dispatch(setLoading(true))
            const data = await getProfile()
            dispatch(setProfile(data.userDetail))
            return data.userDetail
        } catch (error) {
            console.error("Get profile failed", error)
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetAllProfile(page = 1, limit = 20) {
        try {
            dispatch(setLoading(true))
            const data = await getAllProfile(page, limit)
            dispatch(setAllProfiles(data.profile))
            return data
        } catch (error) {
            console.error("Get profile failed", error)
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleDetail(profileId) {
        try {
            const data = await profileDetails(profileId)
            return data.profile
        } catch (error) {
            console.error("Get profile detail failed", error)
        }
    }

    async function handleIsActive() {
        try {
            let latitude;
            let longitude;

            if (navigator.geolocation) {
                try {
                    const pos = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            timeout: 8000,
                            enableHighAccuracy: true,
                        });
                    });
                    latitude = pos.coords.latitude;
                    longitude = pos.coords.longitude;
                } catch (geoError) {
                    console.warn("Geolocation unavailable, toggling without location:", geoError.code, geoError.message);
                }
            }

            const data = await isActive({ latitude, longitude });
            await handleGetProfile();
            return data;
        } catch (error) {
            console.error("Toggle status failed", error);
            throw error;
        }
    }

    return { handleProfile, handlePortfolio, handleGetProfile, handleGetAllProfile, handleDetail, handleIsActive }
}