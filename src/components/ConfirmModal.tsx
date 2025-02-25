import { ForwardedRef, forwardRef } from "react";
import { useGeneralStore } from "../store";

type PropsType = {
 title: string;
};

const ConfirmModal = forwardRef(
 ({ title }: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
  const setShowConfirm = useGeneralStore((state) => state.setShowConfirm);

  return (
   <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
     <p className="py-4">{title}</p>
     <div className="modal-action">
      <button className="btn btn-primary">Confirm</button>
      <form method="dialog">
       {/* if there is a button in form, it will close the modal */}
       <button className="btn" onClick={() => setShowConfirm(false)}>
        Cancel
       </button>
      </form>
     </div>
    </div>
   </dialog>
  );
 }
);

export default ConfirmModal;
