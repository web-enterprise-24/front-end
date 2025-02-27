import { Pencil } from "lucide-react";
import PropsType from "./PropsType";
import { useGeneralStore, useManagementStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { transformRole } from "../../../utils";

const Header = ({ data }: PropsType) => {
 const [modalElement, setIsShowingModal, setModalFor, getProvinces] =
  useGeneralStore(
   useShallow((state) => [
    state.modalElement,
    state.setIsShowingModal,
    state.setModalFor,
    state.getProvinces,
   ])
  );

 const setSelectedUser = useManagementStore((state) => state.setSelectedUser);

 const handleClickEdit = () => {
  modalElement?.showModal();
  setIsShowingModal(true);
  setModalFor("edit-profile");
  setSelectedUser(data);
  getProvinces();
 };

 return (
  <div className="w-full flex flex-row items-center justify-between p-4 rounded-xl border border-base-300">
   <div className="flex flex-row items-center justify-center gap-2">
    <div className="avatar">
     <div className="w-24 rounded-full">
      <img src={data?.profilePicUrl?.toString()} alt="Avatar" />
     </div>
    </div>
    <div className="flex flex-col gap-2">
     <div className="flex flex-row gap-2">
      <p className="font-bold">{data?.name}</p>
      <div
       className={`badge ${data?.status ? "badge-primary" : "badge-accent"}`}
      >
       {data?.status ? "Active" : "Inactive"}
      </div>
     </div>
     <p className="font-bold text-base-content/70">
      {transformRole(data?.roles[0]?.code || "")}
     </p>
    </div>
   </div>
   {data?.roles[0]?.code === "STAFF" && (
    <div
     className="cursor-pointer tooltip tooltip-left"
     data-tip="Edit your profile"
     onClick={handleClickEdit}
    >
     <span>
      <Pencil />
     </span>
    </div>
   )}
  </div>
 );
};

export default Header;
