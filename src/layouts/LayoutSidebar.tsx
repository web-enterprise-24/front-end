import { Outlet } from "react-router-dom";

const LayoutSidebar = () => {
 return (
  <div className="w-screen h-screen">
   <Outlet />
  </div>
 );
};

export default LayoutSidebar;
