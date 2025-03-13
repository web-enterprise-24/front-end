import CommentType from './CommentType';

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
	};
	comments: CommentType[];
};
export default BlogType;
