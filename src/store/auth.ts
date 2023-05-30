import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// state content
type State = {
  authToken: string,
  initToken: string,
  areUsers: boolean
  isAuth: boolean
}

// actions aviable to modify the state
type Actions = {
  setAuthToken: (token: string) => void, 
  setInitToken: (token: string) => void, 
  logout: () => void,
  reset: () => void 
}

// global state for the token on the local storage
export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    authToken: "",
    initToken: "",
    areUsers: false,
    isAuth: false,
    setAuthToken: (authToken: string) => set((state) => (
      {
        authToken,
        isAuth: true
      }
    )),
    setInitToken: (initToken: string) => set((state) => (
      {
        initToken,
        areUsers: true
      }
    )),
    logout: () => set((state) => ( 
      {
        authToken: '',
        isAuth: false
      }
    )),
    reset: () => set((state) => ( 
      {
        initToken: '',
        authToken: '',
        areUsers: false,
        isAuth: false
      }
    ))
  }), {name: "auth"}
));

// // global state for the token on the local storage
// export const useAuthInitStore = create(persist<State & Actions>(
//   (set) => ({
//     token: "123",
//     isAuth: true,
//     setToken: (token: string) => set((state) => (
//       {
//         token,
//         isAuth: true
//       }
//     )),
//   }), {name: "initStore"}
// ));