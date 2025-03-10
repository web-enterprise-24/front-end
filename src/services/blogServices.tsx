import { isAxiosError } from 'axios';
import { axios } from '../utils';

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
