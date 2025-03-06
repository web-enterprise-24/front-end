import { create } from "zustand";
import { MessageSendType, MessageType, UserType } from "../types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
 getChatUsers,
 getMessages,
 sendMessage,
} from "../services/messageServices";
import useAuthStore from "./authStore";

type MessageStoreType = {
 accessToken: string | null;
 messages: MessageType[];
 users: UserType[];
 selectedUser: UserType | null;
 isUserLoading: boolean;
 isMessagesLoading: boolean;
 getMessages: (receiverId: string) => void;
 sendMessage: (messageData: MessageSendType) => void;
 getUsers: () => void;
 setSelectedUser: (user: UserType | null) => void;
 subscribeToMessages: () => void;
 unsubscribeFromMessages: () => void;
};

const accessToken = localStorage.getItem("access");

const useMessageStore = create<MessageStoreType>((set, get) => ({
 accessToken: accessToken || null,
 messages: [],
 users: [],
 selectedUser: null,
 isUserLoading: false,
 isMessagesLoading: false,

 setSelectedUser(user) {
  set({ selectedUser: user });
 },

 async getMessages(receiverId) {
  try {
   set({ isMessagesLoading: true });
   const res = await getMessages(receiverId, accessToken);
   set({ messages: res });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Failed to load messages, please try again!");
   }
  } finally {
   set({ isMessagesLoading: false });
  }
 },

 async getUsers() {
  try {
   set({ isUserLoading: true });
   const res = await getChatUsers(accessToken);
   set({ users: res });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Failed to load users, please try again!");
   }
  } finally {
   set({ isUserLoading: false });
  }
 },

 async sendMessage(data) {
  try {
   const res = await sendMessage(data, accessToken);

   set({ messages: [...get().messages, res] });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(`Failed to send message: ${err.response?.data?.message}`);
   }
  }
 },
 subscribeToMessages() {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;

  socket?.on("newMessage", (newMessage) => {
   if (newMessage.senderId !== selectedUser?.id) return;
   set({
    messages: [...get().messages, newMessage],
   });
  });
 },
 unsubscribeFromMessages() {
  const socket = useAuthStore.getState().socket;
  socket?.off("newMessage");
 },
}));

export default useMessageStore;
