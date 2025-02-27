import { create } from "zustand";
import { ProvinceType } from "../types";
import { getProvinces } from "../services";
import { AxiosError } from "axios";
import { transformProvince } from "../utils";

type GeneralType = {
 provinces: ProvinceType[] | string[] | null;
 modalElement: HTMLDialogElement | null;
 modalFor: "login" | "user-info" | "edit-user" | "edit-profile" | null;
 isShowingModal: boolean;
 isClosingModal: boolean;
 showConfirm: boolean;
 isConfirmEdit: boolean;
 setModalElement: (element: HTMLDialogElement) => void;
 setIsShowingModal: (show: boolean) => void;
 setIsClosingModal: () => void;
 setModalFor: (
  modalFor: "login" | "user-info" | "edit-user" | "edit-profile" | null
 ) => void;
 setShowConfirm: (show: boolean) => void;
 setIsConfirmEdit: (isConfirm: boolean) => void;
 getProvinces: () => void;
};

const useGeneralStore = create<GeneralType>((set) => ({
 provinces: null,
 modalElement: null,
 modalFor: null,
 isShowingModal: false,
 isClosingModal: false,
 showConfirm: false,
 isConfirmEdit: false,

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
 setIsConfirmEdit(isConfirm) {
  set({ isConfirmEdit: isConfirm });
 },
 async getProvinces() {
  try {
   const res = await getProvinces();

   const provinceLists: ProvinceType[] = res.map((province: { name: string }) =>
    transformProvince(province.name)
   );
   set({ provinces: provinceLists });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err.response?.data?.message);
   }
  }
 },
}));

export default useGeneralStore;
