import { useShallow } from "zustand/shallow";
import { useManagementStore } from "../../store";
import TableRow from "./TableRow";
import { Loader } from "lucide-react";

const Table = () => {
 const [userLists, isGettingUserLists] = useManagementStore(
  useShallow((state) => [state.userLists, state.isGettingUserLists])
 );

 if (isGettingUserLists) {
  return (
   <div className="w-full h-full flex items-center justify-center">
    <Loader className="animate-spin" />
   </div>
  );
 }

 return (
  <div>
   <div className="overflow-x-auto max-h-[700px]">
    <table className="table table-zebra overflow-y-auto h-full">
     {/* head */}
     <thead>
      <tr>
       <th>
        <label>
         <input type="checkbox" className="checkbox" />
        </label>
       </th>
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
      {userLists &&
       userLists.map((user) => <TableRow key={user?.id} data={user} />)}
     </tbody>
     {/* foot */}
     <tfoot>
      <tr>
       <td colSpan={8} className="text-end">
        <div className="join">
         <button className="join-item btn">«</button>
         <button className="join-item btn">Page 22</button>
         <button className="join-item btn">»</button>
        </div>
       </td>
      </tr>
     </tfoot>
    </table>
   </div>
  </div>
 );
};

export default Table;
