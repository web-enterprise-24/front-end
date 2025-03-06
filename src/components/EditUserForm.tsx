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
import { UploadImage } from "../utils";

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
 const [isUploading, setIsUploading] = useState(false);

 const dialogRef = useRef<HTMLDialogElement | null>(null);
 const formRef = useRef<HTMLFormElement | null>(null);

 const location = useLocation();

 useEffect(() => {
  console.log(data);
 }, [data]);

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

   const generateImageLink = async () => {
    try {
     setIsUploading(true);
     const result = await UploadImage(file);
     setData({ ...data, profilePicUrl: result });
    } catch (err) {
     console.log(err);
    } finally {
     setIsUploading(false);
    }
   };

   generateImageLink();
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
   studentAllocations,
   myTutor,
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
      <div className={`w-32 avatar relative ${isUploading && "animate-pulse"}`}>
       <div className="w-full rounded-full">
        <img src={data?.profilePicUrl?.toString()} alt="Avatar" />
       </div>
       <span className="absolute bottom-0 right-4 size-6 bg-base-300 flex items-center justify-center rounded-full ring ring-white">
        <Camera />
       </span>
      </div>
     </label>

          <div className="flex flex-col gap-4 md:max-[1537px]:gap-2 w-full">
     <label className="relative block">
  <UserIconDaisyUI className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70" />
  <input
    type="text"
    className="peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
    placeholder=" "
    autoComplete="on"
    value={data?.name || ""}
    onChange={(e) => handleChangeInput(e, "name")}
  />
  <span
    className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
      data?.name ? "top-0 text-sm" : ""
    }`}
  >
    Full name
  </span>
</label>
<div className="flex flex-row items-center gap-4 h-12 w-full">
  <label className="flex flex-row items-center gap-2">
    <input
      type="radio"
      name="gender"
      value={"Male"}
      className="radio peer"
      autoComplete="off"
      checked={data?.gender?.toLowerCase() === "male"}
      onChange={(e) => handleChangeInput(e, "gender")}
    />
    <span className="peer-checked:text-blue-500">Male</span>
  </label>
  <label className="flex flex-row items-center gap-2">
    <input
      type="radio"
      name="gender"
      value={"Female"}
      className="radio peer"
      autoComplete="off"
      checked={data?.gender?.toLowerCase() === "female"}
      onChange={(e) => handleChangeInput(e, "gender")}
    />
    <span className="peer-checked:text-blue-500">Female</span>
  </label>
</div>
     </div>
    </div>
    <label className="relative block w-full flex-col md:max-[1537px]:flex-row md:max-[1537px]:items-center gap-4">
     <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70" />
     <input
      type="text"
      className="peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
      placeholder=" "
      autoComplete="on"
      value={data?.address || ""}
      onChange={(e) => handleChangeInput(e, "address")}
     />
     <span
      className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
       data?.address ? "top-0 text-sm" : ""
      }`}
     >
      Address
     </span>
    </label>
    <div className="flex flex-col gap-4 w-full relative">
     <select
      className="select select-bordered focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
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
     <span
       className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
        data?.city ? "top-0 text-sm" : ""
       }`}
      >
       Province
      </span>
     
      <label className="relative block">
      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70" />
      <input
       type="text"
       className="peer h-12 w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
       placeholder=" "
       value={"Viet Nam"}
       autoComplete="on"
       disabled
      />
      <span
       className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
        data?.country ? "top-0 text-sm" : ""
       }`}
      >
       Country
      </span>
     </label>
    </div>
    <div className="w-full flex flex-col gap-4 relative">
    <DatePicker
     className="input input-bordered flex items-center gap-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
     wrapperClassName="w-full"
     selected={data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date()}
     onChange={(date) =>
      date && data && setData({ ...data, dateOfBirth: date.toISOString() })
     }
     popperPlacement="bottom-end"
     placeholderText={"Date of birth"}
     dateFormat={"dd/MM/yyyy"}
    />
    <span
    className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
      data.dateOfBirth ? "top-0 text-sm" : ""
    }`}
  >
    Date of birth
  </span>
    </div>
    <label className="flex flex-col gap-4 w-full relative ">
      <EmailIconDaisyUI className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70" />
      <input
        type="email"
        className="peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
        placeholder=" "
        defaultValue={data?.email}
        autoComplete="on"
        disabled
      />
      <span
        className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
          data?.email ? "top-0 text-sm" : ""
        }`}
      >
        Email
      </span>
    </label>
   </form>
  </>
 );
};

export default EditUserForm;
