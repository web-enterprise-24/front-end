import { X } from "lucide-react";
import { useMessageStore } from "../../../store";
import { useShallow } from "zustand/shallow";

const Header = () => {
 const [selectedUser, setSelectedUser] = useMessageStore(
  useShallow((state) => [state.selectedUser, state.setSelectedUser])
 );

 return (
  <div className="w-full h-20 flex flex-row items-center justify-between p-4 border-b border-base-200 bg-gray-200 rounded-t-lg">
   <div className="flex flex-row gap-2">
    <div className="avatar">
     <div className="w-14 rounded-full">
      <img src={selectedUser?.profilePicUrl?.toString()} alt="Avatar" />
     </div>
     {/* <div className="size-3 absolute bottom-0 right-0 rounded-full bg-green-400 ring-2 ring-green-200"></div> */}
    </div>
    <div className="flex flex-col gap-1">
     <p className="text-primary-content font-bold">{selectedUser?.name}</p>
     <p className="text-primary-content/50 font-bold">{selectedUser?.email}</p>
    </div>
   </div>
   <X className="cursor-pointer" onClick={() => setSelectedUser(null)} />
  </div>
 );
};

export default Header;
