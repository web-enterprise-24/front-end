import { Eye, EyeClosed } from "lucide-react";
import { forwardRef, ForwardedRef, useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

type PropsType = {
 children?: null;
};

const Modal = forwardRef(
 ({ children }: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log(children);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
   if (passwordInputRef.current) {
    if (showPassword) {
     passwordInputRef.current.type = "text";
    } else if (!showPassword) {
     passwordInputRef.current.type = "password";
    }
   }
  }, [showPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
  };

  return (
   <dialog ref={ref} className="modal">
    <div className="modal-box">
     <Toaster position="top-center" />
     <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-black">Login</h1>
      <h2 className="text-center">
       Enter your details to get sign in to your account
      </h2>
     </div>
     <form
      onSubmit={(e) => handleSubmit(e)}
      className="mt-8 flex flex-col gap-6"
     >
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
        type="text"
        className="grow"
        placeholder="Email"
        autoComplete="emil"
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
        ref={passwordInputRef}
        type="password"
        className="grow"
        autoComplete="current-password"
       />
       <div className="mr-2 flex items-center absolute right-0">
        {!showPassword ? (
         <EyeClosed onClick={() => setShowPassword(!showPassword)} />
        ) : (
         <Eye onClick={() => setShowPassword(!showPassword)} />
        )}
       </div>
      </label>
      <button
       className="btn btn-primary"
       onClick={() => toast.error("Test toaster")}
      >
       Login
      </button>
     </form>
     <p className="text-sm font-normal italic mt-2 cursor-pointer">
      Forgot your password?
     </p>
    </div>
    <form method="dialog" className="modal-backdrop">
     <button>close</button>
    </form>
   </dialog>
  );
 }
);

export default Modal;
