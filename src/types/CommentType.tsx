type CommentType = {
	id: string;
	message: string;
	createdAt: string;
	parentId: string | null;
	_count: {
		likes: number;
	};
	user: {
		id: string;
		name: string;
		email: string;
		profilePicUrl: string;
	};
};

export default CommentType;
