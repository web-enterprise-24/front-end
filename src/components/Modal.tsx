import { forwardRef, ForwardedRef } from "react";
import { Toaster } from "react-hot-toast";

import LoginForm from "./LoginForm";
import { useGeneralStore } from "../store";
import { useShallow } from "zustand/shallow";
import UserInfo from "./UserInfo";

type PropsType = {
 children?: null;
};

const Modal = forwardRef(
 ({ children }: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
  console.log(children);

  const [setIsShowingModal, setIsClosingModal, isShowingModal, modalFor] =
   useGeneralStore(
    useShallow((state) => [
     state.setIsShowingModal,
     state.setIsClosingModal,
     state.isShowingModal,
     state.modalFor,
    ])
   );

  return (
   <dialog ref={ref} className="modal modal-lg">
    <div
     className={`modal-box ${
      modalFor === "login" &&
      "hero-content flex-col lg:flex-row w-full max-w-4xl h-[70vh]"
     }`}
    >
     {modalFor === "login" && (
      <>
       <div className="text-center lg:text-left">
        <Toaster position="top-center" />
        <div className="flex flex-col items-center gap-3">
         <h1 className="text-2xl font-black bold">Log in</h1>
         <p className="y-6">
          Enter your details to get sign in to your account
         </p>
        </div>
       </div>
       <div className="card bg-base-50 w-full max-w-lg shrink-0 shadow-2xl">
        {isShowingModal && <LoginForm />}
       </div>
      </>
     )}
     {modalFor === "user-info" && <UserInfo />}
     {modalFor === "user-info" && (
      <div className="modal-action">
       <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button
         className="btn"
         onClick={() => {
          setIsShowingModal(false);
          setIsClosingModal();
         }}
        >
         Close
        </button>
       </form>
      </div>
     )}
    </div>
    {modalFor === "login" && (
     <form method="dialog" className="modal-backdrop">
      <button
       onClick={() => {
        setIsShowingModal(false);
        setIsClosingModal();
       }}
      >
       close
      </button>
     </form>
    )}
   </dialog>
  );
 }
);

export default Modal;
