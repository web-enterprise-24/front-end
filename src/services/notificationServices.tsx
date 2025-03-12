import { isAxiosError } from 'axios';
import { axios } from '../utils';

export const getNotifications = async () => {
	try {
		const res = await axios.get('/notification');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
