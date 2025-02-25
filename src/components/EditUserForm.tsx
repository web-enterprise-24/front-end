import { Building2, Camera, Globe, MapPinHouse } from "lucide-react";
import { UserIconDaisyUI, EmailIconDaisyUI } from "./Icons";
import DatePicker from "react-datepicker";
import { useEffect, useRef } from "react";
import { useGeneralStore, useManagementStore } from "../store";
import ConfirmModal from "./ConfirmModal";

const EditUserForm = () => {
 const showConfirm = useGeneralStore((state) => state.showConfirm);
 const selectedUser = useManagementStore((state) => state.selectedUser);

 const dialogRef = useRef<HTMLDialogElement | null>(null);

 useEffect(() => {
  if (dialogRef.current) {
   if (showConfirm) {
    dialogRef.current.showModal();
   }
  }
 }, [showConfirm]);

 return (
  <>
   <ConfirmModal
    ref={dialogRef}
    title={"Are you sure you want to change user information?"}
   />

   <form className="w-full flex flex-col items-center justify-center p-4 gap-4">
    <label htmlFor="avatar" className="cursor-pointer">
     <input id="avatar" type="file" accept="image/*" hidden />
     {/* Avatar */}
     <div className="avatar relative">
      <div className="w-32 rounded-full">
       <img src={selectedUser?.profilePicUrl?.toString()} alt="Avatar" />
      </div>
      <span className="absolute bottom-0 right-4 size-6 bg-base-300 flex items-center justify-center rounded-full ring ring-white">
       <Camera />
      </span>
     </div>
    </label>
    <label className="input input-bordered flex items-center gap-2 w-full">
     <UserIconDaisyUI />
     <input
      type="text"
      className="grow"
      defaultValue={selectedUser?.name}
      placeholder="Full name"
      autoComplete="on"
     />
    </label>
    <div className="flex flex-row items-center gap-4 h-12 w-full">
     <label className="flex flex-row items-center gap-2">
      <span>Male</span>
      <input
       type="radio"
       name="gender"
       value={"Male"}
       className="radio"
       autoComplete="off"
       checked={selectedUser?.gender?.toLowerCase() === "male"}
      />
     </label>
     <label className="flex flex-row items-center gap-2">
      <span>Female</span>
      <input
       type="radio"
       name="gender"
       value={"female"}
       className="radio"
       autoComplete="off"
       checked={selectedUser?.gender?.toLowerCase() === "female"}
      />
     </label>
    </div>
    <label className="input input-bordered flex items-center gap-2 w-full">
     <MapPinHouse className="w-4 h-4 text-base-content/70" />
     <input
      type="text"
      className="grow"
      placeholder="Address"
      autoComplete="on"
      defaultValue={selectedUser?.address}
     />
    </label>
    <div className="flex flex-col gap-4 w-full">
     <label className="input input-bordered flex items-center gap-2">
      <Building2 className="w-4 h-4 text-base-content/70" />
      <input
       type="text"
       className="grow max-w-md"
       placeholder="City"
       autoComplete="on"
       defaultValue={selectedUser?.city}
      />
     </label>
     <label className="input input-bordered flex items-center gap-2 ">
      <Globe className="w-4 h-4 text-base-content/70" />
      <input
       type="text"
       className="grow max-w-md"
       placeholder="Country"
       autoComplete="on"
       defaultValue={selectedUser?.country}
      />
     </label>
    </div>
    <DatePicker
     className="input input-bordered flex items-center gap-2 w-full"
     wrapperClassName="w-full"
     // new Date(userData.dateOfBirth)
     selected={
      selectedUser?.dateOfBirth
       ? new Date(selectedUser?.dateOfBirth)
       : new Date()
     }
     // onChange={(date) =>
     //  date && setUserData({ ...userData, dateOfBirth: date.toISOString() })
     // }
     popperPlacement="bottom-end"
     placeholderText={"Date of birth"}
    />
    <label className="input input-bordered flex items-center gap-2 w-full">
     <EmailIconDaisyUI />
     <input
      type="email"
      className="grow"
      placeholder="Email"
      defaultValue={selectedUser?.email}
      //  value={userData.email || ""}
      autoComplete="on"
      //  onChange={(e) => handleChangeInput(e, "email")}
     />
    </label>
   </form>
  </>
 );
};

export default EditUserForm;
