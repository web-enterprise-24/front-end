import { isAxiosError } from "axios";
import { AllocateSendType, UserSendType } from "../types";
import { axios } from "../utils";

export const createNewUser = async (
 data: UserSendType,
 token: string | null
) => {
 try {
  const res = await axios.post("/profile/create", data, {
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

export const getUsers = async (
 role: string,
 token: string | null,
 pageNumber: number | null,
 status: boolean,
 limit: number,
 sortBy: "desc" | "asc",
 searchResult: string
) => {
 try {
  console.log(role, pageNumber, status);
  const res = await axios.get(
   `/account/?role=${role}&status=${!status}&limit=${limit}&page=${pageNumber}&sort=${sortBy}&search=${searchResult}`,
   {
    headers: {
     Authorization: `Bearer ${token}`,
     // "Content-Type": "application/json",
     "x-api-key": import.meta.env.VITE_X_API_KEY,
    },
   }
  );
  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const changeStatus = async (
 userId: string | null,
 status: boolean,
 token: string | null
) => {
 try {
  await axios.patch(
   `/account/${userId}`,
   { status },
   {
    headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "application/json",
     "x-api-key": import.meta.env.VITE_X_API_KEY,
    },
   }
  );
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const allocation = async (
 data: AllocateSendType,
 token: string | null
) => {
 try {
  await axios.post("/allocate", data, {
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

export const deallocation = async (studentId: string, token: string | null) => {
 try {
  await axios.delete(`/allocate/${studentId}`, {
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
