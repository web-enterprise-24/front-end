import RoleType from './RolesType';

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
		roles: RoleType[];
	};
};

export default CommentType;
