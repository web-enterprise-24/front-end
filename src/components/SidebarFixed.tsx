import { Link } from "react-router-dom";
import { SidebarManagementType } from "../types";
import { useState } from "react";
import { ArrowLeftToLine, SquareChevronLeft, SquareChevronRight } from "lucide-react";

type Props = {
 items: SidebarManagementType[];
};

const SidebarFixed = ({ items }: Props) => {
 const [sidebarItemActive, setSideBarItemActive] = useState(1);
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 return (
  <div className="flex">
   <div
    className={`${
     isSidebarOpen ? "w-72" : "w-20"
    } bg-base h-[calc(100vh-64px)] hidden md:flex flex-col justify-between py-16 px-4 shadow-lg shadow-base-300 duration-300 relative`}
   >
    <button
     className="absolute top-4 right-4"
     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      
     {isSidebarOpen ? <SquareChevronLeft className="w-6 h-6  " /> : <SquareChevronRight className="w-6 h-6 " />}
    </button>
    <ul className="w-full flex flex-col gap-6">
     {items &&
      items.map((item) => (
       <li
        key={item.id}
        className={`bg-base-200 p-3 rounded-lg border-3  btn ${
         sidebarItemActive === item.id && "border-2 btn btn-outline"
        }`}
        onClick={() => setSideBarItemActive(item.id)}
       >
        <Link
         to={item.to}
         className="flex flex-row items-center max-[1025px]:justify-center gap-3 text-sm font-normal "
        >
         <item.icon className="w-6 h-6 " />
         <span className={`${!isSidebarOpen && "hidden"} origin-left duration-200`}>{item.title}</span>
        </Link>
       </li>
      ))}
    </ul>
    <Link to={"/"} className="btn btn-outline ">
     <ArrowLeftToLine className="" />
     <span className={`${!isSidebarOpen && "hidden"} origin-left duration-200`}>Back to home</span>
    </Link>
   </div>
   
  </div>
 );
};

export default SidebarFixed;