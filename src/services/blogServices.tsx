import { isAxiosError } from 'axios';
import { axios } from '../utils';
import { BlogSendType } from '../types';

export const getLatestPosts = async () => {
	try {
		const res = await axios.get('blogs/latest?pageNumber=1&pageItemCount=10');

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getPendingPosts = async () => {
	try {
		const res = await axios.get('/blog/editor/submitted/all');

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const postBlog = async (data: BlogSendType) => {
	try {
		const res = await axios.post('/blog/writer', data);

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const approveBlog = async (id: string) => {
	try {
		await axios.put(`/blog/editor/publish/${id}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
