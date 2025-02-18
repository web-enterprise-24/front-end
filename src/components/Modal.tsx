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
   <dialog ref={ref} className="modal">
    <div className="modal-box">
     <Toaster position="top-center" />
     <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-black">
       {form === "login" ? "Log in" : "Sign up"}
      </h1>
      <h2 className="text-center">
       Enter your details to get sign in to your account
      </h2>
     </div>
     {form === "login" ? <LoginForm /> : <SignupForm />}
    </div>
    <form method="dialog" className="modal-backdrop">
     <button>close</button>
    </form>
   </dialog>
  );
 }
);

export default Modal;
