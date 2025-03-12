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

export const markNotificationAsRead = async (id: string) => {
	try {
		await axios.patch(`/notification/${id}/read`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const markNotificationAsReadAll = async () => {
	try {
		await axios.patch('/notification/read');
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const deleteNotification = async (id: string) => {
	try {
		await axios.delete(`/notification/${id}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
