import CommentType from './CommentType';
import RoleType from './RolesType';

type BlogType = {
	id: string;
	title: string;
	description: string;
	draftText: string;
	contentRichText: string;
	tags: string[];
	authorId: string;
	imgUrl: string;
	blogUrl: string;
	likes: number;
	score: number;
	isSubmitted: boolean;
	isDraft: boolean;
	isPublished: boolean;
	status: boolean;
	publishedAt: string;
	createdAt: string;
	updatedAt: string;
	author: {
		name: string;
		profilePicUrl: string;
		roles: RoleType[];
	};
	comments: CommentType[];
};
export default BlogType;
