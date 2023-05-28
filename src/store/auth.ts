import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// state content
type State = {
  token: string,
  isAuth: boolean
}

// actions aviable to modify the state
type Actions = {
  setToken: (token: string) => void, 
  logout: () => void, 
}

// global state for the token on the local storage
export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: "",
    isAuth: false,
    setToken: (token: string) => set((state) => (
      {
        token,
        isAuth: true
      }
    )),
    logout: () => set((state) => ( 
      {
        token: '',
        isAuth: false
      }
    ))
  }), {name: "auth"}
));

// global state for the token on the local storage
export const useAuthReadyStore = create(persist<State & Actions>(
  (set) => ({
    token: "",
    isAuth: false,
    setToken: (token: string) => set((state) => (
      {
        token,
        isAuth: true
      }
    )),
    logout: () => set((state) => ( 
      {
        token: '',
        isAuth: false
      }
    ))
  }), {name: "auth"}
));