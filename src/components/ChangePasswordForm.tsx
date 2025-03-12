import { useState } from "react";
import { PasswordIconDaisyUI } from "./Icons";
import { ChangePasswordFirstTimeType } from "../types";
import toast from "react-hot-toast";
import { useAuthStore } from "../store";
import { useShallow } from "zustand/shallow";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";

const ChangePasswordForm = () => {
 const [requireChangePassword, isChangingPassword] = useAuthStore(
  useShallow((state) => [state.requireChangePassword, state.isChangingPassword])
 );
 const [data, setData] = useState<ChangePasswordFirstTimeType>({});
 const [showOldPassword, setShowOldPassword] = useState(false);
 const [showNewPassword, setShowNewPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: string
 ) => {
  setData({ ...data, [field]: e.target.value });
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!data.oldPassword) return toast("Current password is required");
  if (!data.newPassword) return toast("New password is required");
  if (data.confirmPassword !== data.newPassword)
   return toast("Password confirmation is wrong");

  // call api
  delete data.confirmPassword;
  requireChangePassword(data);
 };

 return (
  <form
   onSubmit={(e) => handleSubmit(e)}
   className="md:w-1/3 flex flex-col justify-center gap-4"
  >
   <label className="input input-bordered flex items-center gap-2 relative">
    <PasswordIconDaisyUI />
    <input
     type={showOldPassword ? "text" : "password"}
     className="grow"
     placeholder="Your current password (default is 12345678)"
     autoComplete="off"
     onChange={(e) => handleChange(e, "oldPassword")}
    />
    <div className="mr-2 flex items-center absolute right-0 cursor-pointer">
     {!showOldPassword ? (
      <EyeClosed onClick={() => setShowOldPassword(!showOldPassword)} />
     ) : (
      <Eye onClick={() => setShowOldPassword(!showOldPassword)} />
     )}
    </div>
   </label>
   <label className="input input-bordered flex items-center gap-2 relative ">
    <PasswordIconDaisyUI />
    <input
     type={showNewPassword ? "text" : "password"}
     className="grow"
     placeholder="New password"
     autoComplete="off"
     onChange={(e) => handleChange(e, "newPassword")}
    />
    <div className="mr-2 flex items-center absolute right-0 cursor-pointer">
     {!showNewPassword ? (
      <EyeClosed onClick={() => setShowNewPassword(!showNewPassword)} />
     ) : (
      <Eye onClick={() => setShowNewPassword(!showNewPassword)} />
     )}
    </div>
   </label>
   <label className="input input-bordered flex items-center gap-2 relative">
    <PasswordIconDaisyUI />
    <input
     type={showConfirmPassword ? "text" : "password"}
     className="grow"
     placeholder="Confirm your new password"
     autoComplete="off"
     onChange={(e) => handleChange(e, "confirmPassword")}
    />
    <div className="mr-2 flex items-center absolute right-0 cursor-pointer">
     {!showConfirmPassword ? (
      <EyeClosed onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
     ) : (
      <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
     )}
    </div>
   </label>
   <button className="btn btn-secondary">
    {isChangingPassword ? <LoaderCircle className="animate-spin" /> : "Change"}
   </button>
  </form>
 );
};

export default ChangePasswordForm;
