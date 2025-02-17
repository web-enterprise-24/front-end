import { create } from "zustand";

type GeneralType = {
 modalElement: HTMLDialogElement | null;
 isShowingModal: boolean;
 setModalElement: (element: HTMLDialogElement) => void;
 setIsShowingModal: () => void;
};

const useGeneralStore = create<GeneralType>((set) => ({
 modalElement: null,
 isShowingModal: false,

 setModalElement(element: HTMLDialogElement) {
  set({ modalElement: element });
 },
 setIsShowingModal() {
  set((state) => ({ isShowingModal: !state.isShowingModal }));
 },
}));

export default useGeneralStore;
