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
import { io, Socket } from "socket.io-client";

type AuthStoreType = {
 accessToken: string | null;
 refreshToken: string | null;
 isCheckingAuth: boolean;
 isLoggingIn: boolean;
 isChangingPassword: boolean;
 isChangingProfile: boolean;
 authUser: UserType | null;
 socket: Socket | null;
 loginUser: (data: UserLoginType) => void;
 logoutUser: () => void;
 checkAuth: () => void;
 requireChangePassword: (data: ChangePasswordFirstTimeType) => void;
 changeProfile: (data: UserSendType, userId: string) => void;
 connectSocket: () => void;
 disconnectSocket: () => void;
};

// Get data from localStorage
const accessToken = localStorage.getItem("access");

const useAuthStore = create<AuthStoreType>((set, get) => ({
 accessToken: accessToken || null,
 refreshToken: null,
 authUser: null,
 socket: null,
 isCheckingAuth: true,
 isSigningUp: false,
 isLoggingIn: false,
 isChangingPassword: false,
 isChangingProfile: false,

 async checkAuth() {
  try {
   const res = await getCurrentUser(accessToken);
   set({ authUser: res });
   get().connectSocket();
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

   set({
    accessToken: res.tokens.accessToken,
    refreshToken: res.tokens.refreshToken,
   });
   get().connectSocket();
   localStorage.setItem("access", res.tokens.accessToken);
   toast.success("Logged in successfully");
   //    setTimeout(() => (window.location.href = "/"), 1500);
   setTimeout(() => window.location.reload(), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(`Log in failed: ${err.response?.data?.message}`);
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
   get().disconnectSocket();
   localStorage.removeItem("access");
   toast.success("Logged out successfully");
   setTimeout(() => window.location.reload(), 1500);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(`Log out failed: ${err.response?.data?.message}`);
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
    toast.error(`Change password failed: ${err.response?.data?.message}`);
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
    toast.error(`Change profile failed: ${err.response?.data?.message}`);
   }
  } finally {
   set({ isChangingProfile: false });
  }
 },
 connectSocket() {
  if (!get().authUser || get().socket?.connected) return;

  const socket = io(import.meta.env.VITE_BASE_URL, {
   query: {
    userId: get().authUser?.id,
   },
  });
  socket.connect();

  set({ socket });
 },
 disconnectSocket() {
  const { socket } = get();

  if (socket) {
   if (socket.connected) socket.disconnect();
  }
 },
}));

export default useAuthStore;
