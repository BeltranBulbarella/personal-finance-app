import type {User} from "@/app/types/authTypes";
import {create} from "zustand";

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (user: User) => set({user}),
    setToken: (token: string) => set({token}),
    logout: () => set({user: null, token: null}),
}));

export default useAuthStore;
