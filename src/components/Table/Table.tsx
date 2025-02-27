import { useShallow } from "zustand/shallow";
import { useManagementStore } from "../../store";
import TableRow from "./TableRow";
import { Loader } from "lucide-react";
import ConfirmModal from "../ConfirmModal";
import { useRef, useState } from "react";

type PropsType = {
 role: "STUDENT" | "TUTOR";
};

const Table = ({ role }: PropsType) => {
 const [
  userLists,
  isGettingUserLists,
  getUserLists,
  totalPage,
  currentPage,
  setCurrentPage,
  changeStatusUser,
 ] = useManagementStore(
  useShallow((state) => [
   state.userLists,
   state.isGettingUserLists,
   state.getUserLists,
   state.totalPage,
   state.currentPage,
   state.setCurrentPage,
   state.changeStatusUser,
  ])
 );
 const [statusChange, setStatusChange] = useState(false);

 const dialogRef = useRef<HTMLDialogElement | null>(null);
 const userIdRef = useRef("");

 if (isGettingUserLists) {
  return (
   <div className="w-full h-1/2 flex items-center justify-center">
    <Loader className="animate-spin" />
   </div>
  );
 }

 //  When clicking on deactivate or activate button
 const handleClickAction = (userId: string, status: boolean) => {
  setStatusChange(status);
  userIdRef.current = userId;

  if (dialogRef.current) {
   dialogRef.current.showModal();
  }
 };

 const handleClickConfirmModal = () => {
  changeStatusUser(userIdRef.current, statusChange, role);
 };

 return (
  <div className="w-full h-[600px] lg:h-[500px] flex flex-col gap-2">
   <ConfirmModal
    ref={dialogRef}
    title={`Are you sure to ${
     statusChange ? "activate" : "deactivate"
    } this account?`}
    events={[handleClickConfirmModal]}
   />
   <div className="h-full overflow-x-auto overflow-y-hidden">
    <table className="h-full table table-zebra">
     {/* head */}
     <thead>
      <tr>
       <th></th>
       <th>Name</th>
       <th>Gender</th>
       <th>Email</th>
       <th>Date of birth</th>
       <th>Address</th>
       <th>Status</th>
       <th></th>
      </tr>
     </thead>
     <tbody>
      {userLists && userLists.length > 0 ? (
       userLists.map((user) => (
        <TableRow key={user?.id} data={user} changeStatus={handleClickAction} />
       ))
      ) : (
       <tr>
        <td colSpan={8} className="text-center">
         There is no result
        </td>
       </tr>
      )}
      <tr></tr>
     </tbody>
    </table>
   </div>
   {userLists && userLists.length > 0 && (
    <div className="join self-end mr-6">
     <button
      className="join-item btn"
      disabled={currentPage === 1 ? true : false}
      onClick={() => {
       setCurrentPage(-1);
       getUserLists(role);
      }}
     >
      «
     </button>
     <button className="join-item btn">Page {currentPage}</button>
     <button
      className="join-item btn"
      disabled={currentPage === totalPage ? true : false}
      onClick={() => {
       setCurrentPage(1);
       getUserLists(role);
      }}
     >
      »
     </button>
    </div>
   )}
  </div>
 );
};

export default Table;
