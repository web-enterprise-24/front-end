import { isAxiosError } from "axios";
import { axios } from "../utils";
import { MessageSendType } from "../types";

export const getChatUsers = async () => {
 try {
  const res = await axios.get("/chat/userChat");
  return res.data.data.userChats;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const getMessages = async (receiverId: string) => {
 try {
  const res = await axios.get(`/chat?selectedUserId=${receiverId}`);
  return res.data.data.messages;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};

export const sendMessage = async (data: MessageSendType) => {
 try {
  const res = await axios.post("/chat", data);
  return res.data.data.message;
 } catch (err) {
  if (isAxiosError(err)) throw err;
 }
};
