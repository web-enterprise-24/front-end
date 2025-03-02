import { memo, useEffect, useRef, useState } from "react";
import { SearchIconDaisyUI } from "../../../components";
import { UserType } from "../../../types";
import UserItem from "./UserItem";
import { CircleCheckBig, Loader } from "lucide-react";

type PropsType = {
 title: string;
 data?: UserType[] | null;
 search?: () => void;
 isLoading: boolean;
 selectedUser: UserType | UserType[];
 searchText: string;
 getUserOnScroll: (role: "TUTOR" | "STUDENT") => void;
 onClick: (user: UserType) => void;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Selection = ({
 title,
 isLoading,
 data,
 selectedUser,
 searchText,
 getUserOnScroll,
 onClick,
 onChange,
}: PropsType) => {
 const [isSelected, setIsSelected] = useState(false);

 const scrollContainerRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  if (Array.isArray(selectedUser)) {
   if (selectedUser[0]) {
    setIsSelected(true);
    return;
   }
  } else {
   if (selectedUser.id) {
    setIsSelected(true);
    return;
   }
  }
  setIsSelected(false);
 }, [selectedUser]);

 const handleScroll = () => {
  if (!scrollContainerRef.current) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

  // If scrolled to bottom (or near bottom with 20px threshold)
  if (scrollTop + clientHeight >= scrollHeight) {
   const role = title.includes("student") ? "STUDENT" : "TUTOR";
   getUserOnScroll(role);
  }
 };

 return (
  <div className="flex flex-col gap-2">
   <div
    className={`flex flex-row items-center gap-2 ${
     isSelected && "text-success"
    }`}
   >
    <p className="font-bold">{title}</p>
    {isSelected && <CircleCheckBig />}
   </div>
   <div className="flex flex-col gap-2">
    <label className="input input-bordered flex items-center gap-2">
     <input
      type="text"
      className="grow"
      placeholder="Search by name or email"
      value={searchText}
      onChange={onChange}
     />
     <SearchIconDaisyUI />
    </label>
    <div
     ref={scrollContainerRef}
     onScroll={handleScroll}
     className="w-[500px] h-[500px] border border-base-200 rounded-lg p-6 overflow-y-auto"
    >
     {isLoading && !data?.[0] ? (
      <div className="w-full h-full flex items-center justify-center">
       <Loader className="size-30 animate-spin" />
      </div>
     ) : (
      <>
       {data && data.length !== 0 ? (
        data.map((item) => {
         let selected = false;
         if (Array.isArray(selectedUser)) {
          const check = selectedUser.some((user) => user.id === item.id);
          if (check) {
           selected = true;
          }
         } else {
          selected = selectedUser.id === item.id;
         }
         return (
          <UserItem
           key={item.id}
           data={item}
           selected={selected}
           onClick={onClick}
          />
         );
        })
       ) : (
        <div className="w-full h-full flex items-center justify-center">
         <span className="font-bold text-sm text-base-content/50">{`There is no ${
          title.includes("student") ? "student" : "tutor"
         }`}</span>
        </div>
       )}
       {isLoading && (
        <div className="w-full flex justify-center items-center">
         <Loader className="size-30 animate-spin" />
        </div>
       )}
      </>
     )}
    </div>
   </div>
  </div>
 );
};

export default memo(Selection);
