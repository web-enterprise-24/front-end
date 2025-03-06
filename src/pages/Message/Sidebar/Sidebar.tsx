import { useShallow } from "zustand/shallow";
import {
 autoUpdate,
 flip,
 offset,
 shift,
 size,
 useFloating,
} from "@floating-ui/react";

import { useManagementStore, useMessageStore } from "../../../store";
import { UserType } from "../../../types";
import SkeletonUserChat from "./SkeletonUserChat";
import UserItem from "./UserItem";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";
import { Loader } from "lucide-react";

const Sidebar = () => {
 const [setSelectedUser, users, isUserLoading] = useMessageStore(
  useShallow((state) => [
   state.setSelectedUser,
   state.users,
   state.isUserLoading,
  ])
 );
 const [userLists, getUserLists, isGettingUserLists, setSearchResult] =
  useManagementStore(
   useShallow((state) => [
    state.userLists,
    state.getUserLists,
    state.isGettingUserLists,
    state.setSearchResult,
   ])
  );

 const [isOpen, setIsOpen] = useState(false);
 const [searchText, setSearchText] = useState("");
 const debounceValue = useDebounce(searchText, 1500);

 useEffect(() => {
  setSearchResult(debounceValue);
  getUserLists("");
 }, [debounceValue, getUserLists, setSearchResult]);

 const handleClick = (user: UserType) => {
  setSelectedUser(user);
 };

 const { refs, floatingStyles } = useFloating({
  open: isOpen,
  onOpenChange: setIsOpen,
  placement: "bottom-start",
  middleware: [
   offset(3),
   flip({ padding: 10 }),
   shift({ padding: 10 }),
   size({
    apply({ rects, elements, availableHeight }) {
     // Constrain width to reference element width
     Object.assign(elements.floating.style, {
      width: `${rects.reference.width}px`,
      maxHeight: `${Math.min(400, availableHeight)}px`,
     });
    },
   }),
  ],
  whileElementsMounted: autoUpdate, // Keep position updated when scrolling or resizing
 });

 return (
  <div className="w-1/4 max-[1281px]:w-full rounded-2xl p-4 overflow-y-auto border-2 border-base-200 flex flex-col gap-4">
   <label
    ref={refs.setReference}
    className="input input-bordered flex items-center gap-2"
   >
    <input
     type="text"
     className="grow"
     value={searchText}
     placeholder="Search by name or email"
     autoComplete="off"
     onChange={(e) => setSearchText(e.target.value)}
     onBlur={() =>
      setTimeout(() => {
       setIsOpen(false);
      }, 200)
     }
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
   {isOpen && (
    <div
     ref={refs.setFloating}
     style={floatingStyles}
     className="bg-white shadow-lg rounded-lg p-3 border border-base-300 z-50 scrollbar-hide"
    >
     {isGettingUserLists ? (
      <span className="animate-spin flex justify-center">
       <Loader />
      </span>
     ) : userLists ? (
      userLists.map((user) => (
       <UserItem
        key={user.id}
        data={user}
        onClick={() => setSelectedUser(user)}
       />
      ))
     ) : (
      <div className="font-bold text-sm text-primary-content/50 text-center">
       There is no matching user
      </div>
     )}
    </div>
   )}
   {isUserLoading
    ? new Array(8)
       .fill(null)
       .map((item, index) => <SkeletonUserChat key={index} />)
    : users.map((user) => (
       <UserItem key={user.id} data={user} onClick={handleClick} />
      ))}
  </div>
 );
};

export default Sidebar;
