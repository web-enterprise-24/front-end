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
import { SearchIconDaisyUI } from "../../components";
import CheckFilter from "./CheckFilter";

type PropsType = {
 title: string;
};

const HeaderManagementUser = ({ title }: PropsType) => {
 const [toggleFilter, setToggleFilter] = useState(true);
 const [searchText, setSearchText] = useState("");
 const [isAllocation, setIsAllocation] = useState({
  allocated: false,
  unallocated: false,
 });

 const allocatedRef = useRef<HTMLInputElement | null>(null);
 const unallocatedRef = useRef<HTMLInputElement | null>(null);

 //  use useDebounce for search
 const debounceValue = useDebounce(searchText, 1500);

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
  setAllocation,
 ] = useManagementStore(
  useShallow((state) => [
   state.setDisplayInactive,
   state.getUserLists,
   state.setCurrentPage,
   state.setSortBy,
   state.setSearchResult,
   state.setAllocation,
  ])
 );

 useEffect(() => {
  setSearchResult(debounceValue);
  setCurrentPage(0, true);
  getUserLists(role.current);
 }, [debounceValue, getUserLists, setCurrentPage, setSearchResult]);

 const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  setDisplayInactive(e.target.checked);
  setCurrentPage(0, true);
  getUserLists(role.current);
 };

 const handleChangeAllocated = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (unallocatedRef.current && unallocatedRef.current.checked) {
   unallocatedRef.current.checked = false;
  }
  if (e.target.checked) {
   setIsAllocation({ unallocated: false, allocated: true });
   setAllocation("allocated");
   setCurrentPage(0, true);
   getUserLists(role.current);

   return;
  }

  if (!isAllocation.unallocated) {
   setAllocation("");
   getUserLists(role.current);
  }

  setIsAllocation({ unallocated: false, allocated: false });
 };

 const handleChangeUnallocated = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (allocatedRef.current && allocatedRef.current.checked) {
   allocatedRef.current.checked = false;
  }

  if (e.target.checked) {
   setIsAllocation({ allocated: false, unallocated: true });
   setAllocation("unallocated");
   setCurrentPage(0, true);
   getUserLists(role.current);

   return;
  }

  if (!isAllocation.allocated) {
   setAllocation("");
   getUserLists(role.current);
  }

  setIsAllocation({ allocated: false, unallocated: false });
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
    <div className="dropdown">
     <span
      tabIndex={0}
      className="lg:hidden size-8 bg-base-200 rounded-full flex items-center justify-center cursor-pointer"
     >
      <SlidersHorizontal className="size-5" />
     </span>
     <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow"
     >
      <li>
       <CheckFilter
        id={"check-active"}
        title={`Show inactive ${
         title.toLowerCase().includes("students") ? "students" : "tutors"
        }`}
        onChange={handleChangeCheck}
       />
      </li>
      {role.current === "STUDENT" && (
       <>
        <li>
         <CheckFilter
          ref={allocatedRef}
          id={"check-allocated"}
          title={"Show allocated"}
          onChange={handleChangeAllocated}
         />
        </li>
        <li>
         <CheckFilter
          ref={unallocatedRef}
          id={"check-unallocated"}
          title={"Show unallocated"}
          onChange={handleChangeUnallocated}
         />
        </li>
       </>
      )}
     </ul>
    </div>

    {/* Show for large screen */}
    {
     <div className="hidden lg:flex items-center gap-2">
      <CheckFilter
       id={"check-active"}
       title={`Show inactive ${
        title.toLowerCase().includes("students") ? "students" : "tutors"
       }`}
       onChange={handleChangeCheck}
      />
      {role.current === "STUDENT" && (
       <>
        <CheckFilter
         ref={allocatedRef}
         id={"check-allocated"}
         title={"Show allocated"}
         onChange={handleChangeAllocated}
        />
        <CheckFilter
         ref={unallocatedRef}
         id={"check-unallocated"}
         title={"Show unallocated"}
         onChange={handleChangeUnallocated}
        />
       </>
      )}
     </div>
    }
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
     <SearchIconDaisyUI />
    </label>
   </div>
  </div>
 );
};

export default HeaderManagementUser;
