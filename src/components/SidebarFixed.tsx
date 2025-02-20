import { Link } from "react-router-dom";
import { SidebarManagementType } from "../types";
import { useState } from "react";
import { ArrowLeftToLine } from "lucide-react";

type Props = {
 items: SidebarManagementType[];
};

const SidebarFixed = ({ items }: Props) => {
 const [sidebarItemActive, setSideBarItemActive] = useState(1);
 return (
  <div className="w-1/6 h-[calc(100vh-64px)] hidden md:flex flex-col justify-between mt-1 py-16 px-4 shadow-lg shadow-base-300 bg-base-100 rounded-2xl">
   <ul className="w-full flex flex-col gap-6">
    {items &&
     items.map((item) => (
      <li
       key={item.id}
       className={`hover:bg-accent/30 p-2 transition-colors duration-150 ease-linear rounded-lg border-2 border-transparent ${
        sidebarItemActive === item.id && "border-2 !border-accent"
       }`}
       onClick={() => setSideBarItemActive(item.id)}
      >
       <Link
        to={item.to}
        className="flex flex-row items-center max-[1025px]:justify-center gap-3 text-sm font-normal text-base-content"
       >
        <item.icon className="w-6 h-6" />
        <span className="max-[1025px]:hidden">{item.title}</span>
       </Link>
      </li>
     ))}
   </ul>
   <Link to={"/"} className="btn btn-primary">
    <ArrowLeftToLine />
    <span className="max-[1025px]:hidden">Back to home</span>
   </Link>
  </div>
 );
};

export default SidebarFixed;
