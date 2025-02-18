import { create } from "zustand";

import { UserType, UserSignUpType, UserLoginType } from "../types";
import { getCurrentUser, login, logout, signup } from "../services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type AuthStoreType = {
 accessToken: string | null;
 refreshToken: string | null;
 isCheckingAuth: boolean;
 isSigningUp: boolean;
 isLoggingIn: boolean;
 authUser: UserType | null;
 signUpUser: (data: UserSignUpType) => void;
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

 async signUpUser(data: UserSignUpType) {
  try {
   set({ isSigningUp: true });
   const res = await signup(data);
   set({ authUser: res.user });
   set({ accessToken: res.tokens.accessToken });
   set({ refreshToken: res.tokens.refreshToken });
   localStorage.setItem("access", res.tokens.accessToken);
   toast.success("Signed up successfully");
   setTimeout(() => (window.location.href = "/"), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err.response?.data?.message);
    toast.error("Sign up failed");
   }
   set({ authUser: null });
   set({ accessToken: null });
   set({ refreshToken: null });
  } finally {
   set({ isSigningUp: false });
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
    console.log(err.response?.data?.message);
    if ([400, 401, 402, 403].includes(err.response?.status || 0)) {
     toast.error(err.response?.data?.message);
    } else {
     toast.error("Log in failed");
    }
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
    console.log(err.response?.data?.message);
    toast.error(err.response?.data?.message);
   }
  }
 },
}));

export default useAuthStore;
