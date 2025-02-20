import { Outlet } from "react-router-dom";
import { NavbarOnlyAvatar, SidebarFixed } from "../../components";
import { SidebarDashboardItems } from "../../constants";

const Dashboard = () => {
 return (
  <>
   <NavbarOnlyAvatar items={SidebarDashboardItems} page={"dashboard"} />
   <div className="flex flex-row justify-between w-full bg-base-300">
    <SidebarFixed items={SidebarDashboardItems} />
    <div className="w-full h-[calc(100vh-64px)] ml-1 mt-1 shadow-md shadow-base-100 bg-base-100 rounded-2xl">
     <Outlet />
    </div>
   </div>
  </>
 );
};

export default Dashboard;
