import { create } from "zustand";
import { UserType, UserSendType } from "../types";
// import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { createNewUser, getUsers } from "../services";

type ManagementStoreType = {
 selectedUser: UserType | null;
 userCreated: UserType | null;
 userLists: UserType[] | null;
 isCreatingUser: boolean;
 isGettingUserLists: boolean;
 createUser: (data: UserSendType) => Promise<void>;
 getUserLists: (role: string) => void;
 setSelectedUser: (user: UserType) => void;
};

// Get token
const accessToken = localStorage.getItem("access");

const useManagementStore = create<ManagementStoreType>((set) => ({
 selectedUser: null,
 userCreated: null,
 userLists: null,
 isCreatingUser: false,
 isGettingUserLists: false,

 async createUser(data: UserSendType) {
  try {
   set({ isCreatingUser: true });
   const res = await createNewUser(data, accessToken);
   set({ userCreated: res });
  } catch (err) {
   if (err instanceof AxiosError) {
    throw err;
   }
  } finally {
   set({ isCreatingUser: false });
  }
 },
 async getUserLists(role) {
  try {
   set({ isGettingUserLists: true });

   const res = await getUsers(role, accessToken);
   set({ userLists: res.data });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
   }
  } finally {
   set({ isGettingUserLists: false });
  }
 },
 setSelectedUser(user) {
  set({ selectedUser: user });
 },
}));

export default useManagementStore;
