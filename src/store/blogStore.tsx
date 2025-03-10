import { create } from 'zustand';
import { BlogType } from '../types';
import { AxiosError } from 'axios';
import { getLatestPosts, getPendingPosts } from '../services';

type BlogStoreType = {
	posts: BlogType[] | null;
	isGettingPosts: boolean;

	getLatestPosts: () => void;
	getPendingPosts: () => void;
};

const useBlogStore = create<BlogStoreType>((set) => ({
	posts: null,
	isGettingPosts: false,

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
			setTimeout(() => {
				set({ isGettingPosts: false });
			}, 3000);
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
			setTimeout(() => {
				set({ isGettingPosts: false });
			}, 3000);
		}
	},
}));

export default useBlogStore;
