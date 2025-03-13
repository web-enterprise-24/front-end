import CommentType from './CommentType';
import StudentDocumentType from './StudentDocumentType';

type TutorDocumentType = StudentDocumentType & {
	student: {
		email: string;
		name: string;
		profilePicUrl: string;
		status: boolean;
	};
	comments: CommentType[];
};

export default TutorDocumentType;
