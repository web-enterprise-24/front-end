import { create } from "zustand";
import { io, Socket } from "socket.io-client";

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
import { axios } from "../utils";

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
 refreshAccessToken: () => Promise<string>;
};

// Get data from localStorage
const accessToken = localStorage.getItem("access");
const savedrefreshToken = localStorage.getItem("refresh");

// New refresh token service
export const refreshToken = async (refreshToken: string) => {
 try {
  const res = await axios.post(
   "/token/refresh",
   { refreshToken },
   {
    // Skip interceptor for this request to avoid loops
    headers: {
     skipAuthRefresh: "true",
     "x-api-key": import.meta.env.VITE_X_API_KEY,
    },
   }
  );
  return res.data.data;
 } catch (err) {
  if (err instanceof AxiosError) throw err;
 }
};

const useAuthStore = create<AuthStoreType>((set, get) => ({
 accessToken: accessToken || null,
 refreshToken: savedrefreshToken || null,
 authUser: null,
 socket: null,
 isCheckingAuth: true,
 isSigningUp: false,
 isLoggingIn: false,
 isChangingPassword: false,
 isChangingProfile: false,

 async refreshAccessToken() {
  const currentRefreshToken = get().refreshToken;

  if (!currentRefreshToken) {
   throw new Error("No refresh token available");
  }

  try {
   const res = await refreshToken(currentRefreshToken);

   // Update tokens in store
   set({
    accessToken: res.accessToken,
    refreshToken: res.refreshToken || get().refreshToken, // Use new refresh token if provided
   });

   // Update localStorage
   localStorage.setItem("access", res.accessToken);
   if (res.refreshToken) {
    localStorage.setItem("refresh", res.refreshToken);
   }

   return res.accessToken;
  } catch (err) {
   // If refresh fails, log the user out silently
   set({
    authUser: null,
    accessToken: null,
    refreshToken: null,
   });
   localStorage.removeItem("access");
   localStorage.removeItem("refresh");

   throw err;
  }
 },

 async checkAuth() {
  try {
   const res = await getCurrentUser();
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
   localStorage.setItem("refresh", res.tokens.refreshToken);

   toast.success("Logged in successfully");
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
   logout();
   get().disconnectSocket();
   localStorage.removeItem("access");
   localStorage.removeItem("refresh");
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
   const res = await editProfile(data, userId);
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

// Connect refreshAccessToken function to the axios instance
// This completes the circular reference safely
import { axios as axiosInstance } from "../utils";
Object.defineProperty(axiosInstance, "refreshAccessToken", {
 get: () => useAuthStore.getState().refreshAccessToken,
});

export default useAuthStore;
