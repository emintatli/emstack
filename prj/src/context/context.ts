import { create } from 'zustand'

type user = {
    email: string
    google: {
        picture: string
    }
}
export const useAuth = create<{
    user: null | user
    setUser: (user: user | null) => void
    setLoading: (loading: boolean) => void
    loading: boolean
    logout: () => void
}>((set) => ({
    user: null,
    setUser: (user: user | null) => set({ user }),
    setLoading: (loading: boolean) => set({ loading }),
    loading: true,
    logout: () => {
        set({ user: null })
        localStorage.clear()
        
    },
}))
