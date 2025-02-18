import { Outlet } from "react-router-dom";
import { NavbarOnlyAvatar, SidebarFixed } from "../components";

import { SidebarManagementItems } from "../constants";

const Management = () => {
 return (
  <>
   <NavbarOnlyAvatar />
   <div className="flex flex-row justify-between w-full">
    <SidebarFixed items={SidebarManagementItems} />
    <div className="w-full md:w-5/6 h-[calc(100vh-64px)]">
     <Outlet />
    </div>
   </div>
  </>
 );
};

export default Management;
