import { create } from 'zustand';
import { BlogSendType, BlogType } from '../types';
import { AxiosError } from 'axios';
import {
	approveBlog,
	getLatestPosts,
	getPendingPosts,
	postBlog,
} from '../services';
import toast from 'react-hot-toast';

type BlogStoreType = {
	posts: BlogType[] | null;
	isGettingPosts: boolean;
	isPostingBlog: boolean;
	isPushingBlog: boolean;

	getLatestPosts: () => void;
	getPendingPosts: () => void;
	postBlog: (data: BlogSendType) => void;
	approveBlog: (id: string) => void;
};

const useBlogStore = create<BlogStoreType>((set, get) => ({
	posts: null,
	isGettingPosts: false,
	isPostingBlog: false,
	isPushingBlog: false,

	async getLatestPosts() {
		try {
			set({ isGettingPosts: true });

			const res = await getLatestPosts();
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
			set({ isPushingBlog: true });
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
			set({ isPushingBlog: false });
		}
	},
}));

export default useBlogStore;
