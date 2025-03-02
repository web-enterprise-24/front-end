/* eslint-disable @typescript-eslint/no-unused-vars */
import { Camera, Globe, MapPinHouse } from "lucide-react";
import { UserIconDaisyUI, EmailIconDaisyUI } from "./Icons";
import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import { useAuthStore, useGeneralStore, useManagementStore } from "../store";
import ConfirmModal from "./ConfirmModal";
import { UserType } from "../types";
import { useShallow } from "zustand/shallow";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

type PropsType = {
 formFor?: "edit-user" | "edit-profile";
};

const EditUserForm = ({ formFor = "edit-user" }: PropsType) => {
 const [
  showConfirm,
  isConfirmEdit,
  setIsConfirmEdit,
  setShowConfirm,
  provinces,
 ] = useGeneralStore(
  useShallow((state) => [
   state.showConfirm,
   state.isConfirmEdit,
   state.setIsConfirmEdit,
   state.setShowConfirm,
   state.provinces,
  ])
 );
 const [selectedUser, editUser] = useManagementStore(
  useShallow((state) => [state.selectedUser, state.editUser])
 );
 const changeProfile = useAuthStore((state) => state.changeProfile);
 const [data, setData] = useState<UserType>(selectedUser || ({} as UserType));

 const dialogRef = useRef<HTMLDialogElement | null>(null);
 const formRef = useRef<HTMLFormElement | null>(null);

 const location = useLocation();

 useEffect(() => {
  if (dialogRef.current) {
   if (showConfirm) {
    dialogRef.current.showModal();
   }
  }
 }, [showConfirm]);

 useEffect(() => {
  if (isConfirmEdit) {
   if (formRef.current) {
    formRef.current.requestSubmit();
   }
  }
 }, [isConfirmEdit]);

 const handleChangeInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: string
 ) => {
  if (field === "file") {
   const file = e.target?.files?.[0];
   if (!file) return;

   const reader = new FileReader();
   reader.readAsDataURL(file);

   reader.onload = () => {
    const base64Image = reader.result;
    if (base64Image) {
     setData({ ...data, profilePicUrl: base64Image });
    }
   };
   return;
  }
  setData({ ...data, [field]: e.target.value });
 };

 const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setData({ ...data, city: e.target.value });
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!data.name) return toast.error("Name is required");
  if (!data.profilePicUrl) return toast.error("Image is required");
  if (!data.address) return toast.error("Address is required");
  if (!data.city) return toast.error("City is required");
  if (!data.country) return toast.error("Country is required");

  // Remove unnecessary fields
  const {
   id,
   createdAt,
   updatedAt,
   requiredPasswordChange,
   roles,
   status,
   verified,
   email,
   firstName,
   lastName,
   ...submitData
  } = data;
  // Call api
  if (formFor === "edit-profile") {
   changeProfile(submitData, id);
  } else if (formFor === "edit-user") {
   const role = location.pathname.includes("student") ? "STUDENT" : "TUTOR";
   editUser(submitData, id, role);
  }
 };

 const handleClickConfirmModal = () => {
  setIsConfirmEdit(true);
  setShowConfirm(false);
 };

 const handleClickCancelModal = () => {
  setShowConfirm(false);
 };

 return (
  <>
   <ConfirmModal
    ref={dialogRef}
    title={"Are you sure you want to change user information?"}
    events={[handleClickConfirmModal, handleClickCancelModal]}
   />

   <form
    ref={formRef}
    className="w-full flex flex-col items-center justify-center p-4 gap-4 overflow-x-hidden"
    onSubmit={(e) => handleSubmit(e)}
   >
    <div className="w-full flex flex-col md:max-[1537px]:flex-row md:max-[1537px]:items-center gap-4">
     <label htmlFor="avatar" className="cursor-pointer self-center flex">
      <input
       id="avatar"
       type="file"
       accept="image/*"
       hidden
       onChange={(e) => handleChangeInput(e, "file")}
      />
      {/* Avatar */}
      <div className="w-32 avatar relative">
       <div className="w-full rounded-full">
        <img src={data?.profilePicUrl?.toString()} alt="Avatar" />
       </div>
       <span className="absolute bottom-0 right-4 size-6 bg-base-300 flex items-center justify-center rounded-full ring ring-white">
        <Camera />
       </span>
      </div>
     </label>
     <div className="flex flex-col gap-4 md:max-[1537px]:gap-2 w-full">
      <label className="input input-bordered flex items-center gap-2 w-full">
       <UserIconDaisyUI />
       <input
        type="text"
        className="grow"
        defaultValue={data?.name}
        placeholder="Full name"
        autoComplete="on"
        onChange={(e) => handleChangeInput(e, "name")}
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
         checked={data?.gender?.toLowerCase() === "male"}
         onChange={(e) => handleChangeInput(e, "gender")}
        />
       </label>
       <label className="flex flex-row items-center gap-2">
        <span>Female</span>
        <input
         type="radio"
         name="gender"
         value={"Female"}
         className="radio"
         autoComplete="off"
         checked={data?.gender?.toLowerCase() === "female"}
         onChange={(e) => handleChangeInput(e, "gender")}
        />
       </label>
      </div>
     </div>
    </div>
    <label className="input input-bordered flex items-center gap-2 w-full">
     <MapPinHouse className="w-4 h-4 text-base-content/70" />
     <input
      type="text"
      className="grow"
      placeholder="Address"
      autoComplete="on"
      defaultValue={data?.address}
      onChange={(e) => handleChangeInput(e, "address")}
     />
    </label>
    <div className="flex flex-col gap-4 w-full">
     <select
      className="select select-bordered"
      defaultValue={data?.city}
      onChange={(e) => handleChangeSelect(e)}
     >
      <option disabled selected>
       Choose your Province
      </option>
      {provinces &&
       provinces.map((province, index) => (
        <option key={index}>{province.toString()}</option>
       ))}
     </select>
     <label className="input input-bordered flex items-center gap-2 ">
      <Globe className="w-4 h-4 text-base-content/70" />
      <input
       type="text"
       className="grow max-w-md"
       placeholder="Country"
       autoComplete="on"
       defaultValue={"Viet Nam"}
       disabled
      />
     </label>
    </div>
    <DatePicker
     className="input input-bordered flex items-center gap-2 w-full"
     wrapperClassName="w-full"
     selected={data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date()}
     onChange={(date) =>
      date && data && setData({ ...data, dateOfBirth: date.toISOString() })
     }
     popperPlacement="bottom-end"
     placeholderText={"Date of birth"}
     dateFormat={"dd/MM/yyyy"}
    />
    <label className="input input-bordered flex items-center gap-2 w-full">
     <EmailIconDaisyUI />
     <input
      type="email"
      className="grow"
      placeholder="Email"
      defaultValue={data?.email}
      autoComplete="on"
      disabled
     />
    </label>
   </form>
  </>
 );
};

export default EditUserForm;
