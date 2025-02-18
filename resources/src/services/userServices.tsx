import { axios } from "../utils";

import { UserLoginType, UserSignUpType } from "../types";

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
 } catch (err) {
  console.log(err);
 }
};

export const signup = async (data: UserSignUpType) => {
 try {
  const res = await axios.post("/signup/basic", data, {
   headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data;
 } catch (err) {
  console.log(err);
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
 } catch (err) {
  console.log(err);
 }
};
