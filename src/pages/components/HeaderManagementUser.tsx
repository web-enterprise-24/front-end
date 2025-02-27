import {
 ArrowUpNarrowWide,
 ArrowUpWideNarrow,
 SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useManagementStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router-dom";

type PropsType = {
 title: string;
};

const HeaderManagementUser = ({ title }: PropsType) => {
 const [setDisplayInactive, getUserLists, setCurrentPage] = useManagementStore(
  useShallow((state) => [
   state.setDisplayInactive,
   state.getUserLists,
   state.setCurrentPage,
  ])
 );

 const location = useLocation();

 const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  setDisplayInactive(e.target.checked);
  setCurrentPage(0, true);
  const role = location.pathname.toLowerCase().includes("student")
   ? "STUDENT"
   : "TUTOR";
  getUserLists(role);
 };

 const [toggleFilter, setToggleFilter] = useState(false);
 return (
  <div className="w-full flex flex-row max-md:flex-col max-md:gap-2 justify-between items-center p-2 pr-6">
   <h1 className="font-black text-lg">{title}</h1>
   <div className="flex flex-row gap-2 items-center">
    {/* Show for mobile screen */}
    <div className="dropdown md:hidden">
     <span
      tabIndex={0}
      className="size-8 bg-base-200 rounded-full flex items-center justify-center cursor-pointer"
     >
      <SlidersHorizontal className="size-5" />
     </span>
     <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow"
     >
      <li>
       <label
        htmlFor="check-active"
        className="flex flex-row items-center gap-2"
       >
        <span className="font-bold text-xs">{`Show inactive ${
         title.toLowerCase().includes("students") ? "students" : "tutors"
        }`}</span>
        <input
         id="check-active"
         type="checkbox"
         className="toggle toggle-sm"
         onChange={(e) => handleChangeCheck(e)}
        />
       </label>
      </li>
     </ul>
    </div>

    {/* Show for large screen */}
    <label
     htmlFor="check-active"
     className="hidden md:flex flex-row items-center gap-2"
    >
     <span className="font-bold text-sm">{`Show inactive ${
      title.toLowerCase().includes("students") ? "students" : "tutors"
     }`}</span>
     <input
      id="check-active"
      type="checkbox"
      className="toggle toggle-sm"
      onChange={(e) => handleChangeCheck(e)}
     />
    </label>

    <span
     className="size-8 bg-base-200 rounded-full flex items-center justify-center cursor-pointer"
     onClick={() => {
      setToggleFilter(!toggleFilter);
     }}
    >
     {!toggleFilter ? (
      <ArrowUpNarrowWide className="size-5" />
     ) : (
      <ArrowUpWideNarrow className="size-5" />
     )}
    </span>
    <label className="input input-bordered flex items-center gap-2 max-md:input-sm">
     <input type="text" className="grow" placeholder="Search by name" />
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path
       fillRule="evenodd"
       d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
       clipRule="evenodd"
      />
     </svg>
    </label>
   </div>
  </div>
 );
};

export default HeaderManagementUser;
