import { ManagementActionItems } from "../../constants";
import Dropdown from "../Dropdown";
import { useGeneralStore, useManagementStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { UserType } from "../../types";
import { convertDate } from "../../utils";

type PropsType = {
 data: UserType;
};

const TableRow = ({ data }: PropsType) => {
 const [setModalFor, modalElement, setIsShowingModal] = useGeneralStore(
  useShallow((state) => [
   state.setModalFor,
   state.modalElement,
   state.setIsShowingModal,
  ])
 );
 const setSelectedUser = useManagementStore((state) => state.setSelectedUser);

 const handleClickAction = (title?: string) => {
  if (title === "Edit") {
   modalElement?.showModal();
   setIsShowingModal(true);
   setModalFor("edit-user");
   setSelectedUser(data);
  }
 };

 return (
  <tr>
   <th>
    <label>
     <input type="checkbox" className="checkbox" />
    </label>
   </th>
   <td>
    <div className="flex items-center gap-3">
     <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
       <img src={data?.profilePicUrl?.toString()} alt="Avatar" />
      </div>
     </div>
     <div>
      <div className="font-bold">{data?.name}</div>
      <div className="text-sm opacity-50">
       {data?.roles[0]?.code.charAt(0) +
        data?.roles[0]?.code.slice(1).toLowerCase()}
      </div>
     </div>
    </div>
   </td>
   <td>{data?.gender}</td>
   <td>{data?.email}</td>
   <td>{data?.dateOfBirth ? convertDate(data.dateOfBirth) : ""}</td>
   <td>{data?.address}</td>
   <td>
    {data?.verified ? (
     <div className="badge badge-primary">Active</div>
    ) : (
     <div className="badge badge-accent">Inactive</div>
    )}
   </td>
   <th>
    <Dropdown
     items={ManagementActionItems}
     variant={"management-action"}
     onClick={handleClickAction}
    >
     <button className="btn btn-ghost btn-xs">details</button>
    </Dropdown>
   </th>
  </tr>
 );
};

export default TableRow;
