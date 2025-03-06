import { isAxiosError } from "axios";
import { axios } from "../utils";
import { MessageSendType } from "../types";

export const getChatUsers = async (token: string | null) => {
 try {
  const res = await axios.get("/chat/userChat", {
   headers: {
    Authorization: `Bearer ${token}`,
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data.userChats;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getMessages = async (receiverId: string, token: string | null) => {
 try {
  const res = await axios.get(`/chat?selectedUserId=${receiverId}`, {
   headers: {
    Authorization: `Bearer ${token}`,
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data.messages;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const sendMessage = async (
 data: MessageSendType,
 token: string | null
) => {
 try {
  const res = await axios.post("/chat", data, {
   headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
   },
  });
  return res.data.data.message;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
