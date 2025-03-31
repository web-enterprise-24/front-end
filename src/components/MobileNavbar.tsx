import { Bell } from 'lucide-react';

import Sidebar from './Sidebar';
import { SidebarType } from '../types';

import { useAuthStore, useGeneralStore, useNotificationStore } from '../store';
import { useShallow } from 'zustand/shallow';
import { useRef, useState } from 'react';
import NotificationBox from './NotificationBox';
import NotificationItem from './NotificationItem';

type PropsType = {
	page?: string;
	items?: SidebarType[];
};

const MobileNavbar = ({ items }: PropsType) => {
	const [modalElement, setIsShowingModal, setModalFor] = useGeneralStore(
		useShallow((state) => [
			state.modalElement,
			state.setIsShowingModal,
			state.setModalFor,
		])
	);
	const [authUser, logoutUser] = useAuthStore(
		useShallow((state) => [state.authUser, state.logoutUser])
	);
	const notifications = useNotificationStore((state) => state.notifications);

	// For notification
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const bellButtonRef = useRef<HTMLDivElement | null>(null);

	const handleClickItem = (title?: string) => {
		if (title === 'Log out') {
			logoutUser();
		} else if (title === 'Dashboard' || title === 'Chat') {
			if (!authUser) {
				modalElement?.showModal();
				setIsShowingModal(true);
				setModalFor('login');
			}
		}
	};

	return (
		<>
			{/* Mobile nav */}
			<Sidebar
				items={items}
				page='home'
				onClick={handleClickItem}
			/>
			<div className=' xl:hidden w-24 h-full'>
				<img
					className='w-full h-full object-cover'
					src='/logo.webp'
					alt='Logo'
				/>
			</div>
			{/* <div className='form-control md:hidden'>
				<input
					type='text'
					placeholder='Search'
					className='input input-bordered border-2 rounded-full w-32 h-10 md:w-auto'
				/>
			</div> */}
			{authUser && (
				<div className='xl:hidden'>
					<div className='relative'>
						<div
							ref={bellButtonRef}
							onClick={() => setNotificationsOpen(!notificationsOpen)}
							className='relative w-7 h-7 cursor-pointer'
						>
							{notifications &&
								notifications.some(
									(notification) => notification.status === 'unread'
								) && (
									<>
										<span className='animate-ping w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline' />
										<span className='w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline' />
									</>
								)}
							<Bell className='w-full h-full' />
						</div>
						<NotificationBox
							isOpen={notificationsOpen}
							setIsOpen={setNotificationsOpen}
							triggerRef={bellButtonRef}
						>
							<div className='w-full min-h-32 h-full overflow-y-auto scrollbar-hide'>
								{notifications && notifications.length > 0 ? (
									notifications.map((notification) => (
										<NotificationItem
											key={notification.id}
											data={notification}
										/>
									))
								) : (
									<div className='flex items-center justify-center'>
										<p className='text-primary-content/40 font-bold'>
											There is no notification
										</p>
									</div>
								)}
							</div>
						</NotificationBox>
					</div>
				</div>
			)}
		</>
	);
};

export default MobileNavbar;
