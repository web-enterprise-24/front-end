import StudentDocumentType from "./StudentDocumentType";

type TutorDocumentType = StudentDocumentType & {
 student: {
  email: string;
  name: string;
  profilePicUrl: string;
  status: boolean;
 };
};

export default TutorDocumentType;
