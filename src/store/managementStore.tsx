import { create } from "zustand";
import { UserType, UserSendType } from "../types";
// import toast from "react-hot-toast";
import { AxiosError } from "axios";

import {
 changeStatus,
 createNewUser,
 editProfile,
 getUsers,
} from "../services";
import toast from "react-hot-toast";

type ManagementStoreType = {
 totalPage: number | null;
 currentPage: number;
 selectedUser: UserType | null;
 userCreated: UserType | null;
 userLists: UserType[] | null;
 isDisplayInactive: boolean;
 isCreatingUser: boolean;
 isGettingUserLists: boolean;
 isEditing: boolean;
 createUser: (data: UserSendType) => Promise<void>;
 getUserLists: (role: string) => void;
 setSelectedUser: (user: UserType | null) => void;
 editUser: (data: UserSendType, userId: string, role: string) => void;
 setCurrentPage: (num: number, reset?: boolean) => void;
 setDisplayInactive: (status: boolean) => void;
 changeStatusUser: (userId: string, status: boolean, role: string) => void;
};

// Get token
const accessToken = localStorage.getItem("access");

const useManagementStore = create<ManagementStoreType>((set, get) => ({
 totalPage: null,
 currentPage: 1,
 selectedUser: null,
 userCreated: null,
 userLists: null,
 isDisplayInactive: false,
 isCreatingUser: false,
 isGettingUserLists: false,
 isEditing: false,

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
   console.log(get().isDisplayInactive, get().currentPage);
   set({ isGettingUserLists: true });

   const res = await getUsers(
    role,
    accessToken,
    get().currentPage,
    get().isDisplayInactive
   );
   set({ userLists: res.data });
   set({ totalPage: res.totalPages });
   set({ currentPage: res.page });
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
 async editUser(data: UserSendType, userId, role) {
  try {
   set({ isEditing: true });
   await editProfile(data, accessToken, userId);
   get().getUserLists(role);
   toast.success("Profile has been changed successfully");
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Change profile failed: ", err.response?.data?.message);
   }
  } finally {
   set({ isEditing: false });
  }
 },
 setCurrentPage(num, reset) {
  if (reset) {
   set({ currentPage: 1 });
  } else {
   set({ currentPage: get().currentPage + num });
  }
 },
 setDisplayInactive(status) {
  set({ isDisplayInactive: status });
 },
 async changeStatusUser(userId, status, role) {
  try {
   await changeStatus(userId, status, accessToken);
   toast.success(`User has been ${status ? "activated" : "deactivated"}`);
   get().getUserLists(role);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Failed: ", err.response?.data?.message);
   }
  }
 },
}));

export default useManagementStore;
