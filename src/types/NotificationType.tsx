type NotificationType = {
	id: string;
	title: string;
	message: string;
	status: 'read' | 'unread';
	type: string;
	timestamp: string;
	userInfo: {
		userId: string;
		userName: string;
		userEmail: string;
		userAvatar: string;
	};
};

export default NotificationType;
