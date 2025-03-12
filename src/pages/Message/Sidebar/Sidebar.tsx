import { useShallow } from "zustand/shallow";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react";

import { useMessageStore } from "../../../store";
import { UserType } from "../../../types";
import SkeletonUserChat from "./SkeletonUserChat";
import UserItem from "./UserItem";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";
import { Loader } from "lucide-react";

const Sidebar = () => {
  const [
    setSelectedUser,
    selectedUser, // Add selectedUser to the store destructuring
    users,
    isUserLoading,
    searchUsers,
    searchUserResult,
    isSearchingUser,
    addUserToList,
  ] = useMessageStore(
    useShallow((state) => [
      state.setSelectedUser,
      state.selectedUser, // Add this
      state.users,
      state.isUserLoading,
      state.searchUsers,
      state.searchUserResult,
      state.isSearchingUser,
      state.addUserToList,
    ])
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debounceValue = useDebounce(searchText, 1500);

  useEffect(() => {
    if (searchText.trim() !== "") {
      searchUsers(debounceValue);
      setIsOpen(true);
    } else if (searchText.trim() === "") {
      setIsOpen(false);
    }
  }, [debounceValue, searchUsers]);

  const handleClick = (user: UserType) => {
    setSelectedUser(user);
  };

  const handleClickSearchUser = (user: UserType) => {
    setSelectedUser(user);
    addUserToList(user);
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
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.min(400, availableHeight)}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div className="max-[1281px]:w-full rounded-lg p-4 border-2 border-base-200 flex flex-col gap-4 bg-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Message</h2>
      </div>
      <div>
        <label
          ref={refs.setReference}
          className="input input-bordered input-sm flex items-center gap-2 min-h-12 mb-4 rounded-3xl"
        >
          <input
            type="text"
            className="grow"
            value={searchText}
            placeholder="Search by name or email"
            autoComplete="off"
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              if (debounceValue) {
                setIsOpen(true);
              }
            }}
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
      </div>
      
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="bg-white shadow-lg rounded-lg p-3 border border-base-300 z-50 max-h-[400px] overflow-y-auto scrollbar-hide"
          >
            {isSearchingUser ? (
              <span className="animate-spin flex justify-center">
                <Loader />
              </span>
            ) : searchUserResult ? (
              searchUserResult.map((user) => (
                <UserItem
                  key={user.id}
                  data={user}
                  onClick={() => handleClickSearchUser(user)}
                  isSelected={selectedUser?.id === user.id} // Pass selected state
                />
              ))
            ) : (
              <div className="font-bold text-sm text-primary-content/50 text-center">
                There is no matching user
              </div>
            )}
          </div>
          
        )}
        <div className="overflow-y-auto w-full">
        {isUserLoading
          ? new Array(8)
              .fill(null)
              .map((item, index) => <SkeletonUserChat key={index + item} />)
          : users.map((user) => (
              <UserItem
                key={user.id}
                data={user}
                onClick={handleClick}
                isSelected={selectedUser?.id === user.id}
              />
            ))}
            </div>
      </div>
    
  );
};

export default Sidebar;