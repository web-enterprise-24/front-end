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

export const getPost = async (id: string) => {
	try {
		const res = await axios.get(`/blogs/${id}`);

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

export const rejectBlog = async (id: string) => {
	try {
		await axios.put(`/blog/editor/unpublish/${id}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const postComment = async (
	data: { message: string },
	blogId: string
) => {
	try {
		const res = await axios.post(`/comment/${blogId}`, data);

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const editComment = async (
	data: { message: string },
	commentId: string,
	blogId: string
) => {
	try {
		const res = await axios.put(`/comment/${blogId}/${commentId}`, data);

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const deleteComment = async (commentId: string, blogId: string) => {
	try {
		await axios.delete(`/comment/${blogId}/${commentId}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
