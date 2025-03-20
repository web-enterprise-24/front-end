import { create } from 'zustand';
import { NotificationType } from '../types';
import { AxiosError } from 'axios';
import {
	deleteNotification,
	getNotifications,
	markNotificationAsRead,
	markNotificationAsReadAll,
} from '../services';
import toast from 'react-hot-toast';

type NotificationStoreType = {
	notifications: NotificationType[] | null;

	getLatestNotification: () => void;
	getNotifications: () => void;
	markAsReadOne: (id: string) => void;
	markAsReadAll: () => void;
	deleteOne: (id: string) => void;
};

const useNotificationStore = create<NotificationStoreType>((set, get) => ({
	notifications: null,

	async getLatestNotification() {
		try {
			const res = await getNotifications();

			set({ notifications: res.notifications });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},
	async getNotifications() {},
	async markAsReadOne(id) {
		try {
			await markNotificationAsRead(id);
			get().getLatestNotification();
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
				toast.error(`Failed to mark as read ${err.response?.data.message}`);
			}
		}
	},
	async markAsReadAll() {
		try {
			await markNotificationAsReadAll();
			get().getLatestNotification();
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
				toast.error(`Failed to mark all as read ${err.response?.data.message}`);
			}
		}
	},
	async deleteOne(id) {
		try {
			await deleteNotification(id);
			get().getLatestNotification();
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
				toast.error(`Failed to delete notification ${err.response?.data.message}`);
			}
		}
	},
}));

export default useNotificationStore;
