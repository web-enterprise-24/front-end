import { Bell } from "lucide-react";

import Sidebar from "./Sidebar";
import { SidebarItemsHomeType } from "../types";
import Dropdown from "./Dropdown";

import { useAuthStore } from "../store";
import { useShallow } from "zustand/shallow";

type PropsType = {
 page?: string;
 items?: SidebarItemsHomeType[];
};

const MobileNavbar = ({ items }: PropsType) => {
 const [authUser, logoutUser, accessToken] = useAuthStore(
  useShallow((state) => [state.authUser, state.logoutUser, state.accessToken])
 );

 const handleClickItem = (title?: string) => {
  if (title === "Log out") {
   logoutUser(accessToken);
  }
 };

 return (
  <>
   {/* Mobile nav */}
   <Sidebar items={items} page="home" onClick={handleClickItem} />
   <div className=" md:hidden w-24 h-full">
    <img className="w-full h-full object-cover" src="/logo.webp" alt="Logo" />
   </div>
   <div className="form-control md:hidden">
    <input
     type="text"
     placeholder="Search"
     className="input input-bordered border-2 rounded-full w-32 h-10 md:w-auto"
    />
   </div>
   {authUser && (
    <div className="md:hidden">
     <Dropdown items={[]} variant={"notification"}>
      <div tabIndex={0} className="relative w-7 h-7 cursor-pointer">
       <span className="animate-ping w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline" />
       <span className="w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline" />
       <Bell className="w-full h-full" />
      </div>
     </Dropdown>
    </div>
   )}
  </>
 );
};

export default MobileNavbar;
