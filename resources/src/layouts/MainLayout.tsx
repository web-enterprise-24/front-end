import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import {Footer} from "../components";

const MainLayout = () => {
 return (
  <div className="w-screen h-screen">
   <Navbar />
   <Outlet />
   <Footer />
  </div>
 );
};

export default MainLayout;
