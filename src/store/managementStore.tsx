import { create } from "zustand";
import { UserType, UserSendType } from "../types";
// import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { createNewUser } from "../services";

type ManagementStoreType = {
 userCreated: UserType | null;
 isCreatingUser: boolean;
 createUser: (data: UserSendType) => Promise<void>;
};

// Get token
const accessToken = localStorage.getItem("access");

const useManagementStore = create<ManagementStoreType>((set) => ({
 userCreated: null,
 isCreatingUser: false,

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
}));

export default useManagementStore;
