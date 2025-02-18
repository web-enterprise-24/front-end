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
    <button className="btn btn-circle top-4 right-4 absolute "
    onClick={() => ref.current?.close()}
    >
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
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
