import { create } from "zustand";

type GeneralType = {
 modalElement: HTMLDialogElement | null;
 modalFor: "login" | "user-info" | null;
 isShowingModal: boolean;
 isClosingModal: boolean;
 setModalElement: (element: HTMLDialogElement) => void;
 setIsShowingModal: (show: boolean) => void;
 setIsClosingModal: () => void;
 setModalFor: (modalFor: "login" | "user-info") => void;
};

const useGeneralStore = create<GeneralType>((set) => ({
 modalElement: null,
 modalFor: null,
 isShowingModal: false,
 isClosingModal: false,

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
}));

export default useGeneralStore;
