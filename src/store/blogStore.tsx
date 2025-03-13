import { create } from 'zustand';
import { BlogSendType, BlogType, CommentType } from '../types';
import { AxiosError } from 'axios';
import {
	approveBlog,
	editComment,
	getLatestPosts,
	getPendingPosts,
	getPost,
	postBlog,
	postComment,
	rejectBlog,
} from '../services';
import toast from 'react-hot-toast';

type BlogStoreType = {
	selectedPost: BlogType | null;
	posts: BlogType[] | null;
	comments: CommentType[];
	rootComments: CommentType[];
	repliesComments: CommentType[];
	isGettingPosts: boolean;
	isLoadingPost: boolean;
	isPostingBlog: boolean;
	isHandlingBlog: boolean;
	isHandlingComment: boolean;

	getLatestPosts: () => void;
	getPendingPosts: () => void;
	getPost: (id: string) => void;
	postBlog: (data: BlogSendType) => void;
	approveBlog: (id: string) => void;
	rejectBlog: (id: string) => void;
	getReplies: (parentId: string) => void;
	postComment: (data: { message: string }, blogId: string) => void;
	updateComment: (
		data: { message: string },
		blogId: string,
		commentId: string
	) => void;
	deleteComment: (blogId: string, commentId: string) => void;
};

const commentByParentId = (comments: CommentType[]) => {
	const commentMap = new Map<string, CommentType[]>();

	comments.forEach((comment) => {
		const parentId = comment.parentId || 'root';

		if (commentMap.has(parentId)) {
			commentMap.get(parentId)?.push(comment);
		} else {
			commentMap.set(parentId, [comment]);
		}
	});

	return commentMap;
};

const useBlogStore = create<BlogStoreType>((set, get) => ({
	selectedPost: null,
	comments: [],
	rootComments: [],
	repliesComments: [],
	posts: null,
	isGettingPosts: false,
	isLoadingPost: false,
	isPostingBlog: false,
	isHandlingBlog: false,
	isHandlingComment: false,

	async getLatestPosts() {
		try {
			set({ isGettingPosts: true });

			const res = await getLatestPosts();
			set({ posts: res.blogs });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				console.log(err);
			}
		} finally {
			set({ isGettingPosts: false });
		}
	},

	async getPendingPosts() {
		try {
			set({ isGettingPosts: true });
			const res = await getPendingPosts();
			set({ posts: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				console.log(err);
			}
		} finally {
			set({ isGettingPosts: false });
		}
	},

	async postBlog(data) {
		try {
			set({ isPostingBlog: true });
			await postBlog(data);
			toast.success('Blog posted successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				console.log(err);
				toast.error(`Failed to post blog: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isPostingBlog: false });
		}
	},

	async approveBlog(id) {
		try {
			set({ isHandlingBlog: true });
			await approveBlog(id);
			get().getPendingPosts();
			toast.success('Blog approved successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				console.log(err);
				toast.error(`Failed to approve blog: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isHandlingBlog: false });
		}
	},

	async rejectBlog(id) {
		try {
			set({ isHandlingBlog: true });
			await rejectBlog(id);
			get().getPendingPosts();
			toast.success('Blog rejected successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				console.log(err);
				toast.error(`Failed to reject blog: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isHandlingBlog: false });
		}
	},
	async getPost(id: string) {
		try {
			set({ isLoadingPost: true });
			const res = await getPost(id);
			set({ selectedPost: res });

			const comments = res.comments;
			set({ comments });

			const rootComments = commentByParentId(comments).get('root') || [];
			set({ rootComments });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				console.log(err);
			}
		} finally {
			set({ isLoadingPost: false });
		}
	},
	getReplies(parentId: string) {
		const comments = get().comments;
		const replies = commentByParentId(comments).get(parentId) || [];
		set({ repliesComments: replies });
	},
	async postComment(data, blogId) {
		try {
			set({ isHandlingComment: true });
			await postComment(data, blogId);
			toast.success('Comment posted successfully!');
			get().getPost(blogId);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to post comment: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isHandlingComment: false });
		}
	},
	async updateComment(data, blogId, commentId) {
		try {
			set({ isHandlingComment: true });
			await editComment(data, commentId, blogId);
			toast.success('Comment updated successfully!');
			get().getPost(blogId);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to update comment: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isHandlingComment: false });
		}
	},
	async deleteComment(blogId, commentId) {
		try {
			set({ isHandlingComment: true });
			await this.deleteComment(commentId, blogId);
			toast.success('Comment deleted successfully!');
			get().getPost(blogId);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to delete comment: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isHandlingComment: false });
		}
	},
}));

export default useBlogStore;
