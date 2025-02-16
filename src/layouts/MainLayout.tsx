import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const MainLayout = () => {
 return (
  <div className="w-screen h-screen">
   <Navbar />
   <Outlet />
  </div>
 );
};

export default MainLayout;
