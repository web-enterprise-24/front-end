import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { UserSignUpType } from "../types";
import { useAuthStore } from "../store";
import { useShallow } from "zustand/shallow";

const SignupForm = () => {
 const [signUpUser, isSigningUp] = useAuthStore(
  useShallow((state) => [state.signUpUser, state.isSigningUp])
 );
 const [userData, setUserData] = useState<UserSignUpType>({});
 const [showPassword, setShowPassword] = useState(false);
 const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

 const submitBtnRef = useRef<HTMLButtonElement | null>(null);

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
     setUserData({ ...userData, profilePicUrl: base64Image });
    }
   };
   return;
  }
  setUserData({ ...userData, [field]: e.target.value });
 };

 window.onkeyup = (e) => {
  if (e.key === "Enter") {
   if (submitBtnRef.current) {
    submitBtnRef.current.click();
   }
  }
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!userData.email) return toast.error("Email is required");
  if (!userData.name) return toast.error("Name is required");
  if (!userData.password) return toast.error("Password is required");
  if (!userData.profilePicUrl) return toast.error("Image is required");
  if (userData.password.length < 6)
   return toast.error("Password must at least 6 characters");
  if (userData.confirmPassword !== userData.password)
   return toast.error("Password confirmation is incorrect");

  //   Call api
  const data = { ...userData };
  delete data.confirmPassword;
  signUpUser(data);
 };

 return (
  <>
   <form onSubmit={(e) => handleSubmit(e)} className="card-body">
    <label className="input input-bordered flex items-center gap-2">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
     </svg>
     <input
      type="email"
      className="grow"
      placeholder="Email"
      autoComplete="on"
      onChange={(e) => handleChangeInput(e, "email")}
     />
    </label>
    <label className="input input-bordered flex items-center gap-2">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
     </svg>
     <input
      type="text"
      className="grow"
      placeholder="Full name"
      autoComplete="off"
      onChange={(e) => handleChangeInput(e, "name")}
     />
    </label>
    <label className="input input-bordered flex items-center gap-2 relative">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path
       fillRule="evenodd"
       d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
       clipRule="evenodd"
      />
     </svg>
     <input
      type={showPassword ? "text" : "password"}
      className="grow"
      placeholder="Your password"
      autoComplete="off"
      onChange={(e) => handleChangeInput(e, "password")}
     />
     <div className="mr-2 flex items-center absolute right-0">
      {!showPassword ? (
       <EyeClosed onClick={() => setShowPassword(!showPassword)} />
      ) : (
       <Eye onClick={() => setShowPassword(!showPassword)} />
      )}
     </div>
    </label>
    <label className="input input-bordered flex items-center gap-2 relative">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path
       fillRule="evenodd"
       d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
       clipRule="evenodd"
      />
     </svg>
     <input
      type={showPasswordConfirm ? "text" : "password"}
      className="grow"
      placeholder="Confirm your password"
      autoComplete="off"
      onChange={(e) => handleChangeInput(e, "confirmPassword")}
     />
     <div className="mr-2 flex items-center absolute right-0">
      {!showPasswordConfirm ? (
       <EyeClosed
        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
       />
      ) : (
       <Eye onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} />
      )}
     </div>
    </label>
    <input
     type="file"
     accept="image/*"
     className="file-input file-input-bordered w-full max-w-xs"
     onChange={(e) => handleChangeInput(e, "file")}
    />
    <button ref={submitBtnRef} className="btn btn-primary">
     {isSigningUp ? <LoaderCircle className="animate-spin" /> : "Sign up"}
    </button>
   </form>
  </>
 );
};

export default SignupForm;
