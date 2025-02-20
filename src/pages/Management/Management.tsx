import { Outlet } from "react-router-dom";
import { NavbarOnlyAvatar, SidebarFixed } from "../../components";

import { SidebarManagementItems } from "../../constants";

const Management = () => {
 return (
  <>
   <NavbarOnlyAvatar />
   <div className="flex flex-row justify-between w-full bg-base-300">
    <SidebarFixed items={SidebarManagementItems} />
    <div className="w-full md:w-5/6 h-[calc(100vh-64px)] ml-1 mt-1 shadow-md shadow-base-100 bg-base-100 rounded-2xl">
     <Outlet />
    </div>
   </div>
  </>
 );
};

export default Management;
