type NotificationType = {
	id: string;
	userId: string;
	title: string;
	message: string;
	isRead: boolean;
	type: string;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	document: {
		id: string;
		studentId: string;
		createdAt: string;
		updatedAt: string;
		fileName: string;
		fileUrl: string;
		fileType: string;
		fileSize: string;
		thumbnailUrl: string;
		status: boolean;
		student: {
			name: string;
			email: string;
			profilePicUrl: string;
		};
	};
};

export default NotificationType;
