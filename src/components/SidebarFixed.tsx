import { Link, useLocation } from "react-router-dom";
import { SidebarType } from "../types";
import { useEffect, useState } from "react";
import {
 ArrowLeftToLine,
 SquareChevronLeft,
 SquareChevronRight,
} from "lucide-react";

type Props = {
 items: SidebarType[];
};

const SidebarFixed = ({ items }: Props) => {
 const [sidebarItemActive, setSideBarItemActive] = useState("add-user");
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 const location = useLocation();

 useEffect(() => {
  setSideBarItemActive(location.pathname.slice(12));
 }, []);

 return (
  <div className="flex">
   <div
    className={`${
     isSidebarOpen ? "w-72" : "w-20"
    } bg-base h-full hidden xl:flex flex-col justify-between py-16 px-4 shadow-lg shadow-base-300 duration-300 relative`}
   >
    <button
     className="absolute top-4 right-4"
     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
     {isSidebarOpen ? (
      <SquareChevronLeft className="w-6 h-6  " />
     ) : (
      <SquareChevronRight className="w-6 h-6 " />
     )}
    </button>
    <ul className="w-full flex flex-col gap-6">
     {items &&
      items.map((item) => (
       <li
        key={item.id}
        className={`bg-base-200 p-3 rounded-lg border-3  btn ${
         sidebarItemActive === item.to && "border-2 btn btn-outline"
        }`}
        onClick={() => setSideBarItemActive(item.to)}
       >
        <Link
         to={item.to}
         className="flex flex-row items-center max-[1025px]:justify-center gap-3 text-sm font-normal "
        >
         <item.icon className="w-6 h-6 " />
         <span
          className={`${!isSidebarOpen && "hidden"} origin-left duration-200`}
         >
          {item.title}
         </span>
        </Link>
       </li>
      ))}
    </ul>
    <Link to={"/"} className="btn btn-outline ">
     <ArrowLeftToLine className="" />
     <span className={`${!isSidebarOpen && "hidden"} origin-left duration-200`}>
      Back to home
     </span>
    </Link>
   </div>
  </div>
 );
};

export default SidebarFixed;
