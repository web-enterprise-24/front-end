import { isAxiosError } from "axios";
import { UserSendType } from "../types";
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
