import { create } from "zustand";

import { UserType, UserSignUpType, UserLoginType } from "../types";
import { getCurrentUser, login, signup } from "../services";
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
   setTimeout(() => window.location.reload(), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err.response?.data?.message);
    toast.error("Sign up failed");
   }
   toast.error("Sign up failed");
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
   setTimeout(() => window.location.reload(), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err.response?.data?.message);
    toast.error("Log in failed");
   }
  } finally {
   set({ isLoggingIn: false });
  }
 },
}));

export default useAuthStore;
