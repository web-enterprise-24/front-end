import { CloudUpload, X } from "lucide-react";
import { useRef, useState, DragEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";

interface UploadWidgetProps {
 onFileSelect?: (file: File) => void;
 onClick?: () => void;
}

const UploadWidget = ({ onFileSelect, onClick }: UploadWidgetProps = {}) => {
 const labelRef = useRef<HTMLLabelElement | null>(null);
 const [isDragging, setIsDragging] = useState<boolean>(false);

 const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(true);
 };

 const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  if (!isDragging) setIsDragging(true);
 };

 const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
 };

 const handleDrop = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
   const file = e.dataTransfer.files[0];
   processFile(file);
  }
 };

 const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
   const file = e.target.files[0];
   processFile(file);
  }
 };

 const processFile = (file: File) => {
  // Check if file type is valid
  const validTypes = [
   "application/pdf",
   "application/msword",
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!validTypes.includes(file.type)) {
   toast.error("Please select a valid file type (PDF, DOC, DOCX)");
   return;
  }

  // Handle the file - pass it to parent component if callback provided
  if (onFileSelect) {
   onFileSelect(file);
  }

  //   console.log("File selected:", file.name, file.type, file.size);
 };

 return (
  <div
   className={`w-full h-60 max-h-60 flex items-center justify-center border-2 border-dashed rounded-2xl transition-colors duration-300 relative ${
    isDragging
     ? "border-primary bg-primary/10"
     : "border-primary/30 bg-base-200/50 hover:bg-base-200"
   }`}
   onDragEnter={handleDragEnter}
   onDragOver={handleDragOver}
   onDragLeave={handleDragLeave}
   onDrop={handleDrop}
  >
   <span
    className="size-10 absolute flex items-center justify-center top-2 right-2 rounded-full hover:bg-primary cursor-pointer transition-colors ease-linear duration-150"
    onClick={onClick}
   >
    <X className="size-6" />
   </span>
   <div className="flex flex-col gap-3 items-center justify-center p-6">
    <CloudUpload
     className={`size-16 ${isDragging ? "text-primary" : "text-primary/70"}`}
    />
    <p className="text-md font-bold text-base-content/80">
     Drop or drag your file here
    </p>
    <span className="text-xl font-semibold text-primary">or</span>
    <label ref={labelRef} htmlFor="file-upload" className="cursor-pointer">
     <button
      className="btn btn-primary btn-sm hover:btn-primary-focus"
      onClick={() => {
       if (labelRef.current) {
        labelRef.current.click();
       }
      }}
     >
      Browse
     </button>
     <input
      id="file-upload"
      type="file"
      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      hidden
      onChange={handleFileInputChange}
     />
    </label>
    <p className="text-xs text-base-content/60 mt-1">
     Supported formats: PDF, DOC, DOCX
    </p>
   </div>
  </div>
 );
};

export default UploadWidget;
