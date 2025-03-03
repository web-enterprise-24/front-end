import { create } from "zustand";

import {
 UserType,
 UserLoginType,
 ChangePasswordFirstTimeType,
 UserSendType,
} from "../types";
import {
 changePasswordFirstTime,
 editProfile,
 getCurrentUser,
 login,
 logout,
} from "../services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type AuthStoreType = {
 accessToken: string | null;
 refreshToken: string | null;
 isCheckingAuth: boolean;
 //  isSigningUp: boolean;
 isLoggingIn: boolean;
 isChangingPassword: boolean;
 isChangingProfile: boolean;
 authUser: UserType | null;
 //  signUpUser: (data: UserSignUpType) => void;
 loginUser: (data: UserLoginType) => void;
 logoutUser: (accessToken: string | null) => void;
 checkAuth: (accessToken: string | null) => void;
 requireChangePassword: (data: ChangePasswordFirstTimeType) => void;
 changeProfile: (data: UserSendType, userId: string) => void;
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
 isChangingPassword: false,
 isChangingProfile: false,

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

   if (res.user) set({ authUser: res.user });
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
 async requireChangePassword(data) {
  try {
   set({ isChangingPassword: true });
   await changePasswordFirstTime(data, accessToken);
   localStorage.removeItem("access");
   toast.success("Password has been changed successfully");
   setTimeout(() => {
    window.location.href = "/";
   }, 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Change password failed: ", err.response?.data?.message);
   }
  } finally {
   set({ isChangingPassword: false });
  }
 },
 async changeProfile(data: UserSendType, userId: string) {
  try {
   set({ isChangingProfile: true });
   const res = await editProfile(data, accessToken, userId);
   set({ authUser: res });
   toast.success("Profile has been changed successfully");
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Change profile failed: ", err.response?.data?.message);
   }
  } finally {
   set({ isChangingProfile: false });
  }
 },
}));

export default useAuthStore;
