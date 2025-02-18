import { create } from "zustand";

type GeneralType = {
 modalElement: HTMLDialogElement | null;
 isShowingModal: boolean;
 form: "login" | "signup";
 setModalElement: (element: HTMLDialogElement) => void;
 setIsShowingModal: () => void;
 setForm: (form: GeneralType["form"]) => void;
};

const useGeneralStore = create<GeneralType>((set) => ({
 modalElement: null,
 isShowingModal: false,
 form: "login",

 setModalElement(element: HTMLDialogElement) {
  set({ modalElement: element });
 },
 setIsShowingModal() {
  set((state) => ({ isShowingModal: !state.isShowingModal }));
 },
 setForm(form: GeneralType["form"]) {
  set({ form });
 },
}));

export default useGeneralStore;
