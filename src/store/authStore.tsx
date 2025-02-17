import { create } from "zustand";

import { UserType } from "../types";

type AuthStoreType = {
 authUser: UserType | null;
};
// const testData: UserType = {
//  id: "user123454",
//  name: "John Wick",
//  age: 99,
//  email: "abc@gmail.com",
// };
const useAuthStore = create<AuthStoreType>(() => ({
 authUser: null,
}));

export default useAuthStore;
