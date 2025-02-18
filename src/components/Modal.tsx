import { forwardRef, ForwardedRef } from "react";
import { Toaster } from "react-hot-toast";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useGeneralStore } from "../store";

type PropsType = {
 children?: null;
};

const Modal = forwardRef(
 ({ children }: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
  console.log(children);

  const form = useGeneralStore((state) => state.form);

  return (
   <dialog ref={ref} className="modal modal-lg">
    <div className="modal-box hero-content flex-col lg:flex-row w-full max-w-4xl h-[70vh]">
    <div className="text-center lg:text-left">
     <Toaster position="top-center" />
     <div className="flex flex-col items-center gap-3">
      <h1 className="text-2xl font-black bold">
       {form === "login" ? "Log in" : "Sign up"}
      </h1>
      <p className="y-6">
       Enter your details to get sign in to your account
      </p>
      </div>
     </div>
     <div className="card bg-base-50 w-full max-w-lg shrink-0 shadow-2xl">
        {form === "login" ? <LoginForm /> : <SignupForm />}
        </div>
    </div>
    <form method="dialog" className="modal-backdrop">
     <button>close</button>
    </form>
   </dialog>
  );
 }
);

export default Modal;
