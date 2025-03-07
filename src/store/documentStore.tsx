import { create } from "zustand";
import { StudentDocumentType, TutorDocumentType } from "../types";
import { AxiosError } from "axios";
import {
 getMyDocuments,
 getStudentDocuments,
 uploadDocument,
} from "../services";
import toast from "react-hot-toast";

type DocumentStoreType = {
 accessToken: string | null;
 documents: StudentDocumentType[] | TutorDocumentType[];
 isGettingDocument: boolean;
 isUploadingDocument: boolean;

 upload: (data: FormData) => void;
 getStudentDocument: () => void;
 getTutorDocument: () => void;
};

const accessToken = localStorage.getItem("access");

const useDocumentStore = create<DocumentStoreType>((set, get) => ({
 accessToken: accessToken || null,
 documents: [],
 isGettingDocument: false,
 isUploadingDocument: false,

 async upload(data) {
  try {
   set({ isUploadingDocument: true });
   await uploadDocument(data);
   get().getStudentDocument();
   toast.success("Document uploaded successfully");
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(`Upload document failed: ${err.response?.data?.message}`);
   }
  } finally {
   set({ isUploadingDocument: false });
  }
 },
 async getStudentDocument() {
  try {
   set({ isGettingDocument: true });
   const res = await getMyDocuments();
   set({ documents: res });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(`Failed to load documents, please try again!`);
   }
  } finally {
   set({ isGettingDocument: false });
  }
 },
 async getTutorDocument() {
  try {
   set({ isGettingDocument: true });
   const res = await getStudentDocuments();
   set({ documents: res });
  } catch (err) {
   if (err instanceof AxiosError) {
    console.log(err);
    toast.error(`Failed to load documents, please try again!`);
   }
  } finally {
   set({ isGettingDocument: false });
  }
 },
}));

export default useDocumentStore;
