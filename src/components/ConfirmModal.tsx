import { ForwardedRef, forwardRef } from "react";

type PropsType = {
 title: string;
 events?: (() => void)[];
};

const ConfirmModal = forwardRef(
 ({ title, events }: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
  return (
   <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
     <p className="py-4">{title}</p>
     <div className="modal-action">
      <form method="dialog">
       {/* if there is a button in form, it will close the modal */}
       <button className="btn btn-primary" onClick={events?.[0]}>
        Confirm
       </button>
       <button className="btn" onClick={events?.[1]}>
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
