import React, { useState } from 'react'
import { useProfile } from "../hooks/useProfile"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const PROFESSION_OPTIONS = [
    { value: "photographer", label: "Photographer" },
    { value: "videographer", label: "Videographer" },
    { value: "editor", label: "Editor" },
]

const Profile = () => {
    const { handleProfile } = useProfile()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.profile.loading)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({ professions: [], bio: "", experience: "", city: "", state: "", address: "", equipments: "", profileImage: null, pricePerHour: "" })
    const [imagePreview, setImagePreview] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // keep the raw File for upload
            setFormData((prev) => ({ ...prev, profileImage: file }))
            // only use FileReader for a lightweight local preview, not for sending to the server
            const reader = new FileReader()
            reader.onload = (ev) => setImagePreview(ev.target.result)
            reader.readAsDataURL(file)
        }
    }

    const toggleProfession = (profession) => {
        setFormData((prev) => {
            const exists = prev.professions.includes(profession)
            return exists ? { ...prev, professions: prev.professions.filter(p => p !== profession) } : { ...prev, professions: [...prev.professions, profession] }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const fd = new FormData()
            fd.append("profession", JSON.stringify(formData.professions))
            fd.append("bio", formData.bio)
            fd.append("experience", formData.experience)
            fd.append("city", formData.city)
            fd.append("state", formData.state)
            fd.append("address", formData.address)
            fd.append("equipments", JSON.stringify(
                formData.equipments.split(",").map(e => e.trim()).filter(Boolean)
            ))
            fd.append("pricePerHour", formData.pricePerHour)
            if (formData.profileImage) {
                fd.append("profileImage", formData.profileImage)
            }

            await handleProfile(fd)
            navigate("/")
        } catch (error) { console.error("Profile submission failed", error) }
    }

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 2))
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))
    const isStepValid = () => {
        if (step === 1) return formData.professions.length > 0 && formData.bio
        if (step === 2) return formData.experience && formData.city
        return true
    }

    return (
        <div className="min-h-screen">
            <div className="min-h-screen flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-6">
                        <img src="/divine_capture_logo.svg" alt="DivineCapture" className="w-36 md:w-44 mx-auto" />
                    </div>
                    <div className="bg-cream border border-coffee/20 rounded-2xl p-6 sm:p-8 shadow-lg">
                        <div className="text-center mb-6">
                            <h1 className="text-xl sm:text-2xl font-semibold text-charcoal">Create Your Profile</h1>
                            <p className="text-[13px] text-charcoal/50 mt-1">Step {step} of 2 — Tell us about your services</p>
                        </div>

                        <div className="flex items-center justify-between mb-8 px-2">
                            {[1, 2, 3].slice(0, 2).map((s) => (
                                <React.Fragment key={s}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2 ${
                                            step > s ? 'bg-gold border-gold text-charcoal' :
                                            step === s ? 'bg-gold border-gold text-charcoal shadow-md shadow-gold/30' :
                                            'bg-cream border-coffee/30 text-charcoal/50'
                                        }`}>
                                            {step > s ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            ) : s}
                                        </div>
                                        <span className={`text-[11px] mt-1.5 font-medium tracking-wide ${step >= s ? 'text-charcoal' : 'text-charcoal/40'}`}>
                                            {s === 1 ? 'Basic' : 'Details'}
                                        </span>
                                    </div>
                                    {s < 2 && (
                                        <div className="flex-1 mx-3">
                                            <div className="h-[2px] rounded-full bg-coffee/20 relative overflow-hidden">
                                                <div className={`h-full bg-gold transition-all duration-500`} style={{ width: step > s ? '100%' : '0%' }} />
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="animate-[fadeIn_0.3s_ease-out] space-y-5">
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-2 tracking-wide">Profession <span className="text-gold">*</span></label>
                                        <div className="flex flex-wrap gap-2.5">
                                            {PROFESSION_OPTIONS.map((p) => {
                                                const selected = formData.professions.includes(p.value)
                                                return (
                                                    <button key={p.value} type="button" onClick={() => toggleProfession(p.value)}
                                                        className={`px-4 py-2.5 text-[13px] font-medium rounded-[10px] border-2 transition-all duration-200 cursor-pointer ${
                                                            selected ? 'bg-gold border-gold text-charcoal shadow-sm shadow-gold/30' :
                                                            'bg-cream border-coffee/20 text-charcoal/60 hover:border-gold/40 hover:bg-gold/5'
                                                        }`}>{p.label}</button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">Bio</label>
                                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} maxLength={500}
                                            placeholder="Tell us about yourself... (max 500 characters)" required
                                            className="w-full px-3 sm:px-4 py-3 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none" />
                                        <p className="text-[11px] text-charcoal/40 mt-1 text-right">{formData.bio.length}/500</p>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate-[fadeIn_0.3s_ease-out] space-y-5">
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">Experience (Years)</label>
                                        <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" step="0.5" placeholder="e.g. 5" required
                                            className="w-full h-[44px] px-3 sm:px-4 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">City</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" required
                                            className="w-full h-[44px] px-3 sm:px-4 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">Price Per Hour (₹)</label>
                                        <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} min="0" step="1" placeholder="e.g. 50"
                                            className="w-full h-[44px] px-3 sm:px-4 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">State</label>
                                        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter your state"
                                            className="w-full h-[44px] px-3 sm:px-4 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">Address</label>
                                        <textarea name="address" value={formData.address} onChange={handleChange} rows={2} placeholder="Enter your full address"
                                            className="w-full px-3 sm:px-4 py-3 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">Equipments <span className="text-gold">*</span></label>
                                        <textarea name="equipments" value={formData.equipments} onChange={handleChange} rows={2}
                                            placeholder='Comma-separated (e.g. Canon EOS R5, DJI Mavic 3)' required
                                            className="w-full px-3 sm:px-4 py-3 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream text-charcoal placeholder-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-charcoal/60 mb-1.5 tracking-wide">Profile Image</label>
                                        <input type="file" name="profileImage" onChange={handleImageChange} accept="image/*"
                                            className="w-full h-[44px] px-3 sm:px-4 text-[14px] rounded-[10px] border border-coffee/20 outline-none bg-cream file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:text-[12px] file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 transition-all cursor-pointer" />
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover mt-2 border border-coffee/20" />
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between mt-8 pt-5 border-t border-coffee/10">
                                {step > 1 ? (
                                    <button type="button" onClick={prevStep}
                                        className="h-[42px] px-6 text-[13px] font-medium text-charcoal/60 rounded-[10px] border border-coffee/20 hover:bg-gold/5 transition-all flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back
                                    </button>
                                ) : <div></div>}
                                {step < 2 ? (
                                    <button type="button" onClick={nextStep} disabled={!isStepValid()}
                                        className="h-[42px] px-8 text-[13px] font-semibold rounded-[10px] bg-gradient-to-r from-gold to-amber-600 hover:from-gold hover:to-amber-500 text-charcoal transition-all shadow-md shadow-gold/20 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                                        Continue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                ) : (
                                    <button type="submit" disabled={loading}
                                        className="h-[42px] px-8 text-[13px] font-semibold rounded-[10px] bg-gradient-to-r from-gold to-amber-600 hover:from-gold hover:to-amber-500 text-charcoal transition-all shadow-md shadow-gold/20 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                        {loading ? (
                                            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Creating...</>
                                        ) : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>Complete</>}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    )
}

export default Profile