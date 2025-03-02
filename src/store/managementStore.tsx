import { create } from "zustand";
import { UserType, UserSendType, AllocateSendType } from "../types";
// import toast from "react-hot-toast";
import { AxiosError } from "axios";

import {
 allocation,
 changeStatus,
 createNewUser,
 deallocation,
 editProfile,
 getUsers,
} from "../services";
import toast from "react-hot-toast";

type ManagementStoreType = {
 totalPage: number | null;
 totalPageTutor: number | null;
 totalPageStudent: number | null;
 currentPage: number;
 currentPageTutor: number;
 currentPageStudent: number;
 sortBy: "desc" | "asc";
 searchResult: string;
 selectedUser: UserType | null;
 userCreated: UserType | null;
 userLists: UserType[] | null;
 tutorLists: UserType[];
 studentLists: UserType[];
 isDisplayInactive: boolean;
 isCreatingUser: boolean;
 isGettingUserLists: boolean;
 isGettingTutorLists: boolean;
 isGettingStudentLists: boolean;
 isEditing: boolean;
 isAllocating: boolean;
 createUser: (data: UserSendType) => Promise<void>;
 getUserLists: (role: string, isAllocation?: boolean) => void;
 setSelectedUser: (user: UserType | null) => void;
 editUser: (data: UserSendType, userId: string, role: string) => void;
 setCurrentPage: (num: number, reset?: boolean) => void;
 setCurrentPageTutor: (num: number, reset?: boolean) => void;
 setCurrentPageStudent: (num: number, reset?: boolean) => void;
 setDisplayInactive: (status: boolean) => void;
 changeStatusUser: (userId: string, status: boolean, role: string) => void;
 setSortBy: (sort: "desc" | "asc") => void;
 setSearchResult: (result: string) => void;
 reset: () => void;
 setTutorLists: () => void;
 setStudentLists: () => void;
 allocateStudent: (data: AllocateSendType) => void;
 deallocateStudent: (studentId: string) => void;
};

// Get token
const accessToken = localStorage.getItem("access");

const useManagementStore = create<ManagementStoreType>((set, get) => ({
 totalPage: null,
 totalPageTutor: null,
 totalPageStudent: null,
 currentPage: 1,
 currentPageTutor: 1,
 currentPageStudent: 1,
 sortBy: "desc" as const,
 searchResult: "",
 selectedUser: null,
 userCreated: null,
 userLists: null,
 tutorLists: [],
 studentLists: [],
 isDisplayInactive: false,
 isCreatingUser: false,
 isGettingUserLists: false,
 isGettingTutorLists: false,
 isGettingStudentLists: false,
 isEditing: false,
 isAllocating: false,

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
 async getUserLists(role, isAllocation = false) {
  try {
   let limit = 5;
   if (!isAllocation) {
    set({ isGettingUserLists: true });
   } else if (isAllocation) {
    if (role === "TUTOR") {
     set({ isGettingTutorLists: true });
    } else if (role === "STUDENT") {
     set({ isGettingStudentLists: true });
    }
    limit = 10;
   }

   const res = await getUsers(
    role,
    accessToken,
    get().currentPage,
    get().isDisplayInactive,
    limit,
    get().sortBy,
    get().searchResult
   );
   if (!isAllocation) {
    set({ userLists: res.data });
    set({ totalPage: res.totalPages });
   } else if (isAllocation) {
    if (role === "TUTOR") {
     set({ tutorLists: [...get().tutorLists, ...res.data] });
     set({ totalPageTutor: res.totalPages });
    } else if (role === "STUDENT") {
     // Remove all students that have been allocated a tutor
     const modifiedResponse = [...res.data];

     modifiedResponse.forEach((student, index) => {
      if (student.studentAllocations[0]) {
       modifiedResponse.splice(index, 1);
      }
     });

     set({ studentLists: [...get().studentLists, ...modifiedResponse] });
     set({ totalPageStudent: res.totalPages });
    }
   }
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
   }
  } finally {
   if (!isAllocation) {
    set({ isGettingUserLists: false });
   } else if (isAllocation) {
    if (role === "TUTOR") {
     set({ isGettingTutorLists: false });
    } else if (role === "STUDENT") {
     set({ isGettingStudentLists: false });
    }
   }
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
 setCurrentPageTutor(num, reset) {
  if (reset) {
   set({ currentPageTutor: 1 });
   set({ currentPage: 1 });
  } else {
   set({ currentPageTutor: get().currentPageTutor + num });
   set({ currentPage: get().currentPageTutor });
  }
 },
 setCurrentPageStudent(num, reset) {
  if (reset) {
   set({ currentPageStudent: 1 });
   set({ currentPage: 1 });
  } else {
   set({ currentPageStudent: get().currentPageStudent + num });
   set({ currentPage: get().currentPageStudent });
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
 setSortBy(sort) {
  set({ sortBy: sort });
 },
 setSearchResult(result) {
  set({ searchResult: result });
 },
 reset() {
  set({ currentPage: 1 });
  set({ currentPageTutor: 1 });
  set({ currentPageStudent: 1 });
  set({ isDisplayInactive: false });
  set({ sortBy: "desc" });
  set({ searchResult: "" });
  set({ tutorLists: [] });
  set({ studentLists: [] });
 },
 setTutorLists() {
  set({ tutorLists: [] });
 },
 setStudentLists() {
  set({ studentLists: [] });
 },
 async allocateStudent(data) {
  try {
   set({ isAllocating: true });
   await allocation(data, accessToken);

   // Clear and toast
   toast.success("Allocated successfully");
   set({ tutorLists: [] });
   set({ studentLists: [] });
   set({ currentPageTutor: 1 });
   set({ currentPageStudent: 1 });

   //    Recall getUsers
   get().getUserLists("TUTOR", true);
   get().getUserLists("STUDENT", true);
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Allocation failed: ", err.response?.data?.message);
   }
  } finally {
   set({ isAllocating: false });
  }
 },
 async deallocateStudent(studentId) {
  try {
   await deallocation(studentId, accessToken);
   toast.success("Student has been deallocated successfully");
   get().getUserLists("STUDENT");
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Deallocation failed: ", err.response?.data?.message);
   }
  }
 },
}));

export default useManagementStore;
