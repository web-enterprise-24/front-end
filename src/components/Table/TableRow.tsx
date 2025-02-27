import { ManagementActionItems } from "../../constants";
import Dropdown from "../Dropdown";
import { useGeneralStore, useManagementStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { UserType } from "../../types";
import { convertDate } from "../../utils";
import { UserRoundCheck } from "lucide-react";

type PropsType = {
 data: UserType;
 changeStatus: (userId: string, status: boolean) => void;
};

const TableRow = ({ data, changeStatus }: PropsType) => {
 const [setModalFor, modalElement, setIsShowingModal, getProvinces] =
  useGeneralStore(
   useShallow((state) => [
    state.setModalFor,
    state.modalElement,
    state.setIsShowingModal,
    state.getProvinces,
   ])
  );
 const setSelectedUser = useManagementStore((state) => state.setSelectedUser);

 const handleClickAction = (title?: string) => {
  if (title === "Edit") {
   modalElement?.showModal();
   setIsShowingModal(true);
   setModalFor("edit-user");
   setSelectedUser(data);
   getProvinces();
  } else if (title === "Deactivate") {
   changeStatus(data?.id, false);
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
      <div className="font-bold truncate">{data?.name}</div>
      <div className="text-sm opacity-50">
       {data?.roles[0]?.code.charAt(0) +
        data?.roles[0]?.code.slice(1).toLowerCase()}
      </div>
     </div>
    </div>
   </td>
   <td>{data?.gender}</td>
   <td className="truncate">{data?.email}</td>
   <td className="truncate">
    {data?.dateOfBirth ? convertDate(data.dateOfBirth) : ""}
   </td>
   <td className="truncate">{data?.address}</td>
   <td>
    {data?.status ? (
     <div className="badge badge-primary">Active</div>
    ) : (
     <div className="badge badge-accent">Inactive</div>
    )}
   </td>
   <th>
    {data?.status ? (
     <Dropdown
      items={ManagementActionItems}
      variant={"management-action"}
      onClick={handleClickAction}
     >
      <button className="btn btn-ghost btn-xs">details</button>
     </Dropdown>
    ) : (
     <button
      className="btn btn-neutral btn-sm hover:underline"
      onClick={() => changeStatus(data.id, true)}
     >
      <UserRoundCheck /> Activate
     </button>
    )}
   </th>
  </tr>
 );
};

export default TableRow;
