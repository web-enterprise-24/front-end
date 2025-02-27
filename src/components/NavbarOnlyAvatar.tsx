import Sidebar from "./Sidebar";

import { useAuthStore, useManagementStore } from "../store";
import { SidebarType } from "../types";
import { transformRole } from "../utils";
import { useShallow } from "zustand/shallow";

type PropsType = {
 items: SidebarType[];
 page: string;
};

const NavbarOnlyAvatar = ({ items, page }: PropsType) => {
 const [setCurrentPage, setDisplayInactive] = useManagementStore(
  useShallow((state) => [state.setCurrentPage, state.setDisplayInactive])
 );
 const authUser = useAuthStore((state) => state.authUser);

 const handleClick = (title: string) => {
  if (title === "Tutor Management" || title === "Student Management") {
   setCurrentPage(0, true);
   setDisplayInactive(false);
  }
 };

 return (
  <div className="w-full h-16 bg-base shadow-md shadow-base-300">
   <div className="container mx-auto px-8 max-[821px]:px-2 w-full h-full flex items-center justify-between">
    <Sidebar items={items} page={page} onClick={handleClick} />
    <div className="w-24 h-24">
     <img className="w-full h-full object-cover" src="/logo.webp" alt="Logo" />
    </div>
    <div className="hidden xl:flex flex-row items-center gap-6">
     <div className="flex flex-col items-end justify-center">
      <p className="font-bold">{authUser?.name}</p>
      <p className="text-sm">{transformRole(authUser?.roles[0]?.code || "")}</p>
     </div>
     <div className="avatar">
      <div className="w-12 rounded-full">
       <img src={authUser?.profilePicUrl?.toString()} alt="Avatar" />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default NavbarOnlyAvatar;
