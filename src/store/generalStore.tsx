import { create } from "zustand";

type GeneralType = {
 modalElement: HTMLDialogElement | null;
 modalFor: "login" | "user-info" | "edit-user" | null;
 isShowingModal: boolean;
 isClosingModal: boolean;
 showConfirm: boolean;
 setModalElement: (element: HTMLDialogElement) => void;
 setIsShowingModal: (show: boolean) => void;
 setIsClosingModal: () => void;
 setModalFor: (modalFor: "login" | "user-info" | "edit-user") => void;
 setShowConfirm: (show: boolean) => void;
};

const useGeneralStore = create<GeneralType>((set) => ({
 modalElement: null,
 modalFor: null,
 isShowingModal: false,
 isClosingModal: false,
 showConfirm: false,

 setModalElement(element: HTMLDialogElement) {
  set({ modalElement: element });
 },
 setIsShowingModal(show) {
  if (!show) {
   set({ isShowingModal: show });
  }
  set({ isShowingModal: show });
 },
 setIsClosingModal() {
  set({ isClosingModal: true });
  setTimeout(() => set({ isClosingModal: false }), 100);
 },
 setModalFor(modalFor) {
  set({ modalFor });
 },
 setShowConfirm(show) {
  set({ showConfirm: show });
 },
}));

export default useGeneralStore;
