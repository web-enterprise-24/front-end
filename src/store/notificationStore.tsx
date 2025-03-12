import { create } from 'zustand';
import { NotificationType } from '../types';

type NotificationStoreType = {
	notifications: NotificationType[] | null;

	getLatestNotification: () => void;
	getNotifications: () => void;
	markAsReadOne: (id: string) => void;
	markAsReadAll: () => void;
	deleteOne: (id: string) => void;
};

const useNotificationStore = create<NotificationStoreType>(() => ({
	notifications: null,

	async getLatestNotification() {},
	async getNotifications() {},
	async markAsReadOne(id) {
		console.log('markAsReadOne', id);
	},
	async markAsReadAll() {},
	async deleteOne(id) {
		console.log('deleteOne', id);
	},
}));

export default useNotificationStore;
