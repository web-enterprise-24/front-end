import { Building2, Globe, LoaderCircle, MapPinHouse } from "lucide-react";
import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import { EmailIconDaisyUI, Overlay, UserIconDaisyUI } from "../../components";
import "./datepicker.css";
import { UserSendType } from "../../types";
import { useManagementStore, useGeneralStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { AxiosError } from "axios";
import { UploadImage } from "../../utils";

type PropsType = {
 role: "STUDENT" | "TUTOR" | "STAFF";
};

const AddStudentForm = ({ role }: PropsType) => {
 const [modalElement, setIsShowingModal, setModalFor] = useGeneralStore(
  useShallow((state) => [
   state.modalElement,
   state.setIsShowingModal,
   state.setModalFor,
  ])
 );
 const [isCreatingUser, createUser] = useManagementStore(
  useShallow((state) => [state.isCreatingUser, state.createUser])
 );
 const [userData, setUserData] = useState<UserSendType>({
  role,
  gender: "male",
  dateOfBirth: new Date().toISOString(),
 });
 const [isUploading, setIsUploading] = useState(false);

 const fileInputRef = useRef<HTMLInputElement | null>(null);

 useEffect(() => {
  setUserData({ role, gender: "male", dateOfBirth: new Date().toISOString() });
  if (fileInputRef.current) {
   fileInputRef.current.value = "";
  }
 }, [role]);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!userData.name) return toast.error("Name is required");
  if (!userData.email) return toast.error("Email is required");
  if (!userData.profilePicUrl) return toast.error("Image is required");
  if (!userData.address) return toast.error("Address is required");
  if (!userData.city) return toast.error("City is required");
  if (!userData.country) return toast.error("Country is required");

  //   Call api
  try {
   await createUser(userData);
   modalElement?.showModal();
   setIsShowingModal(true);
   setModalFor("user-info");
   setUserData({ role, gender: "male", dateOfBirth: new Date().toISOString() });
   if (fileInputRef.current) {
    fileInputRef.current.value = "";
   }
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error("Sign up failed", err.response?.data?.message);
   }
  }
 };

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
     console.log(result);
     setUserData({ ...userData, profilePicUrl: result });
    } catch (err) {
     console.log(err);
    } finally {
     setIsUploading(false);
    }
   };

   generateImageLink();
   return;
  }

  setUserData({ ...userData, [field]: e.target.value });
 };

 return (
  <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
   {isUploading && <Overlay isOpenLoader />}
   <label className="input input-bordered flex items-center gap-2">
    <UserIconDaisyUI />
    <input
     type="text"
     className="grow"
     placeholder="Full name"
     autoComplete="on"
     value={userData.name || ""}
     onChange={(e) => handleChangeInput(e, "name")}
    />
   </label>
   <div className="flex flex-row items-center gap-4 h-12">
    <label className="flex flex-row items-center gap-2">
     <span>Male</span>
     <input
      type="radio"
      name="gender"
      value={"male"}
      className="radio"
      autoComplete="off"
      checked={userData.gender === "male"}
      onChange={(e) => handleChangeInput(e, "gender")}
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
      checked={userData.gender === "female"}
      onChange={(e) => handleChangeInput(e, "gender")}
     />
    </label>
   </div>
   <label className="input input-bordered flex items-center gap-2">
    <MapPinHouse className="w-4 h-4 text-base-content/70" />
    <input
     type="text"
     className="grow"
     placeholder="Address"
     value={userData.address || ""}
     autoComplete="on"
     onChange={(e) => handleChangeInput(e, "address")}
    />
   </label>
   <div className="flex flex-col xl:flex-row gap-4">
    <label className="input input-bordered flex items-center gap-2 xl:w-1/2">
     <Building2 className="w-4 h-4 text-base-content/70" />
     <input
      type="text"
      className="grow"
      placeholder="City"
      value={userData.city || ""}
      autoComplete="on"
      onChange={(e) => handleChangeInput(e, "city")}
     />
    </label>
    <label className="input input-bordered flex items-center gap-2 xl:w-1/2">
     <Globe className="w-4 h-4 text-base-content/70" />
     <input
      type="text"
      className="grow"
      placeholder="Country"
      value={userData.country || ""}
      autoComplete="on"
      onChange={(e) => handleChangeInput(e, "country")}
     />
    </label>
   </div>
   <DatePicker
    className="input input-bordered flex items-center gap-2 w-full"
    selected={new Date(userData.dateOfBirth)}
    onChange={(date) =>
     date && setUserData({ ...userData, dateOfBirth: date.toISOString() })
    }
    popperPlacement="bottom-end"
    placeholderText={"Date of birth"}
   />
   <label className="input input-bordered flex items-center gap-2">
    <EmailIconDaisyUI />
    <input
     type="email"
     className="grow"
     placeholder="Email"
     value={userData.email || ""}
     autoComplete="on"
     onChange={(e) => handleChangeInput(e, "email")}
    />
   </label>
   <input
    ref={fileInputRef}
    type="file"
    className="file-input file-input-bordered w-full"
    onChange={(e) => handleChangeInput(e, "file")}
   />
   <button className="btn btn-primary">
    {isCreatingUser ? <LoaderCircle className="animate-spin" /> : "Create"}
   </button>
  </form>
 );
};

export default AddStudentForm;
