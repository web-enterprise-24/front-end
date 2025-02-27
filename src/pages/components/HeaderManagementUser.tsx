import {
 ArrowUpNarrowWide,
 ArrowUpWideNarrow,
 SlidersHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useManagementStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router-dom";
import { useDebounce } from "../../hooks";

type PropsType = {
 title: string;
};

const HeaderManagementUser = ({ title }: PropsType) => {
 const [toggleFilter, setToggleFilter] = useState(true);
 const [searchText, setSearchText] = useState("");

 //  use useDebounce for search
 const debounceValue = useDebounce(searchText, 1000);

 //  Get role basing on location path name
 const location = useLocation();
 const role = useRef("");
 role.current = location.pathname.includes("student") ? "STUDENT" : "TUTOR";

 const [
  setDisplayInactive,
  getUserLists,
  setCurrentPage,
  setSortBy,
  setSearchResult,
 ] = useManagementStore(
  useShallow((state) => [
   state.setDisplayInactive,
   state.getUserLists,
   state.setCurrentPage,
   state.setSortBy,
   state.setSearchResult,
  ])
 );

 useEffect(() => {
  console.log(debounceValue);
  //   if (!debounceValue.trim()) return;
  setSearchResult(debounceValue);
  getUserLists(role.current);
 }, [debounceValue, getUserLists, setSearchResult]);

 const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  setDisplayInactive(e.target.checked);
  setCurrentPage(0, true);
  getUserLists(role.current);
 };

 const handleClickSort = () => {
  //    set state to change interface
  setToggleFilter(!toggleFilter);

  //   set sort and call api immediately
  if (toggleFilter) {
   setSortBy("asc");
  } else if (!toggleFilter) {
   setSortBy("desc");
  }
  getUserLists(role.current);
 };

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
     onClick={handleClickSort}
    >
     {!toggleFilter ? (
      <ArrowUpNarrowWide className="size-5" />
     ) : (
      <ArrowUpWideNarrow className="size-5" />
     )}
    </span>
    <label className="input input-bordered flex items-center gap-2 max-md:input-sm">
     <input
      type="text"
      className="grow"
      placeholder="Search by name or email"
      onChange={(e) => setSearchText(e.target.value.trim())}
     />
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
