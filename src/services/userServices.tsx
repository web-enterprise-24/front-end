import { isAxiosError } from "axios";

import { axios } from "../utils";

import {
 ChangePasswordFirstTimeType,
 UserLoginType,
 UserSendType,
} from "../types";

export const getCurrentUser = async (token: string | null) => {
 try {
  const res = await axios.get("/profile/my", {
   headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data;
 } catch (err: unknown) {
  if (isAxiosError(err)) throw err;
 }
};

export const login = async (data: UserLoginType) => {
 try {
  const res = await axios.post("/login/basic", data, {
   headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data;
 } catch (err: unknown) {
  if (isAxiosError(err)) throw err;
 }
};

export const logout = async (token: string | null) => {
 try {
  await axios.get("/logout", {
   headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
 } catch (err: unknown) {
  if (isAxiosError(err)) throw err;
 }
};

export const changePasswordFirstTime = async (
 data: ChangePasswordFirstTimeType,
 token: string | null
) => {
 try {
  await axios.post("/credential/user/change-password", data, {
   headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const editProfile = async (
 data: UserSendType | null,
 token: string | null,
 userId: string | null
) => {
 try {
  const res = await axios.put(`/profile/update/${userId}`, data, {
   headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
