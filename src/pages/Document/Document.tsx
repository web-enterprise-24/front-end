import { useEffect, useRef, useState } from "react";
import { useAuthStore, useDocumentStore } from "../../store";
import FileItem from "./FileItem";
import UploadWidget from "./UploadWidget";
import ConfirmModal from "../../components/ConfirmModal";
import { useShallow } from "zustand/shallow";
import { Overlay } from "../../components";

const Document = () => {
 const authUser = useAuthStore((state) => state.authUser);
 const [
  upload,
  getStudentDocument,
  getTutorDocument,
  documents,
  isUploadingDocument,
 ] = useDocumentStore(
  useShallow((state) => [
   state.upload,
   state.getStudentDocument,
   state.getTutorDocument,
   state.documents,
   state.isUploadingDocument,
  ])
 );
 const [isOpenUpload, setIsOpenUpload] = useState(false);

 const uploadFileRef = useRef<File | null>(null);
 const dialogRef = useRef<HTMLDialogElement | null>(null);

 useEffect(() => {
  let role;
  if (authUser) {
   role = authUser.roles[0].code;
  }

  if (role === "STUDENT") {
   getStudentDocument();
  } else if (role === "TUTOR") {
   getTutorDocument();
  }
 }, [authUser, getStudentDocument, getTutorDocument]);

 const handleUploadFile = (file: File) => {
  uploadFileRef.current = file;

  if (dialogRef.current) {
   dialogRef.current.showModal();
  }
 };

 const handleClickConfirmUpload = () => {
  if (!uploadFileRef.current) return;

  const formData = new FormData();
  formData.append("file", uploadFileRef.current);
  upload(formData);
 };

 return (
  <div className="w-1/2 max-[821px]:w-full max-[821px]:px-6 min-h-full mx-auto my-6 flex flex-col gap-6">
   {isUploadingDocument && <Overlay isOpenLoader={true} />}
   <ConfirmModal
    ref={dialogRef}
    title="Are you sure to upload this file?"
    events={[handleClickConfirmUpload]}
   />
   <div className="w-full h-10 flex flex-row items-center justify-between">
    <h1 className="font-bold text-xl">All documents</h1>
    {authUser?.roles[0]?.code === "STUDENT" && (
     <button className="btn btn-primary" onClick={() => setIsOpenUpload(true)}>
      Upload your file
     </button>
    )}
   </div>
   {/* Upload zone */}
   {isOpenUpload && (
    <UploadWidget
     onFileSelect={handleUploadFile}
     onClick={() => setIsOpenUpload(false)}
    />
   )}
   <div className="w-full h-full flex flex-col gap-4">
    {documents &&
     documents.map((document) => (
      <FileItem
       key={document.id}
       data={document}
       role={(authUser?.roles[0]?.code || "") as "" | "TUTOR" | "STUDENT"}
      />
     ))}
   </div>
   <div className="join self-center">
    <button className="join-item btn">«</button>
    <button className="join-item btn">Page 22</button>
    <button className="join-item btn">»</button>
   </div>
  </div>
 );
};

export default Document;
