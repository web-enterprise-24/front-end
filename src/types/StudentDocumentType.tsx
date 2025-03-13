import CommentType from './CommentType';

type StudentDocumentType = {
	id: string;
	studentId: string;
	createdAt: string;
	updatedAt: string;
	fileName: string;
	fileUrl: string;
	fileType: string;
	fileSize: number;
	status: boolean;
	comments: CommentType[];
};

export default StudentDocumentType;
