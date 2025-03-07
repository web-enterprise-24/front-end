import { isAxiosError } from "axios";
import { AllocateSendType, UserSendType } from "../types";
import { axios } from "../utils";

export const createNewUser = async (data: UserSendType) => {
 try {
  const res = await axios.post("/profile/create", data);
  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getUsers = async (
 role: string,
 pageNumber: number | null,
 status: boolean,
 limit: number,
 sortBy: "desc" | "asc",
 searchResult: string,
 allocate: "unallocated" | "allocated" | ""
) => {
 try {
  const res = await axios.get(
   `/account/?role=${role}&status=${!status}&limit=${limit}&page=${pageNumber}&sort=${sortBy}&search=${searchResult}&filter=${allocate}`
  );
  return res.data.data;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const changeStatus = async (userId: string | null, status: boolean) => {
 try {
  await axios.patch(`/account/${userId}`, { status });
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const allocation = async (data: AllocateSendType) => {
 try {
  await axios.post("/allocate", data);
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const deallocation = async (studentId: string) => {
 try {
  await axios.delete(`/allocate/${studentId}`);
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
