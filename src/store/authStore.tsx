import { create } from "zustand";

import { UserType, UserLoginType } from "../types";
import { getCurrentUser, login, logout } from "../services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type AuthStoreType = {
 accessToken: string | null;
 refreshToken: string | null;
 isCheckingAuth: boolean;
 //  isSigningUp: boolean;
 isLoggingIn: boolean;
 authUser: UserType | null;
 //  signUpUser: (data: UserSignUpType) => void;
 loginUser: (data: UserLoginType) => void;
 logoutUser: (accessToken: string | null) => void;
 checkAuth: (accessToken: string | null) => void;
};

// Get data from localStorage
const accessToken = localStorage.getItem("access");

const useAuthStore = create<AuthStoreType>((set) => ({
 accessToken: accessToken || null,
 refreshToken: null,
 authUser: null,
 isCheckingAuth: true,
 isSigningUp: false,
 isLoggingIn: false,

 async checkAuth(token) {
  try {
   const res = await getCurrentUser(token);
   set({ authUser: res });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err.response?.data?.message);
   }
   set({ authUser: null });
  } finally {
   set({ isCheckingAuth: false });
  }
 },

 async loginUser(data) {
  try {
   set({ isLoggingIn: true });
   const res = await login(data);
   set({ authUser: res.user });
   set({ accessToken: res.tokens.accessToken });
   set({ refreshToken: res.tokens.refreshToken });
   localStorage.setItem("access", res.tokens.accessToken);
   toast.success("Logged in successfully");
   setTimeout(() => (window.location.href = "/"), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Log in failed", err.response?.data?.message);
   }
   set({
    authUser: null,
    accessToken: null,
    refreshToken: null,
   });
  } finally {
   set({ isLoggingIn: false });
  }
 },
 logoutUser() {
  try {
   logout(accessToken);
   localStorage.removeItem("access");
   toast.success("Logged out successfully");
   setTimeout(() => (window.location.href = "/"), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(err.response?.data?.message);
   }
  }
 },
}));

export default useAuthStore;
