import { House, MessageCircleMore, Bell, Folder, BookOpen } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { motion } from 'framer-motion';

import MobileNavbar from './MobileNavbar';
import { SidebarHomeItems, UserDropdownItems } from '../constants';
import Dropdown from './Dropdown';
import { useAuthStore, useGeneralStore, useNotificationStore } from '../store';
import { transformRole } from '../utils';
import { useEffect, useRef, useState } from 'react';
import NotificationBox from './NotificationBox';
import NotificationItem from './NotificationItem';

const Navbar = () => {
	const [modalElement, setIsShowingModal, setModalFor] = useGeneralStore(
		useShallow((state) => [
			state.modalElement,
			state.setIsShowingModal,
			state.setModalFor,
		])
	);
	const [notifications, getLatestNotification] = useNotificationStore(
		useShallow((state) => [state.notifications, state.getLatestNotification])
	);
	const [authUser, logoutUser] = useAuthStore(
		useShallow((state) => [state.authUser, state.logoutUser])
	);

	// For notification
	// Inside your Navbar component
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const bellButtonRef = useRef<HTMLDivElement | null>(null);

	const location = useLocation();
	const [activeTab, setActiveTab] = useState('/');

	useEffect(() => {
		const path = location.pathname;
		if (path === '/') {
			setActiveTab('/');
		} else if (path.startsWith('/message')) {
			setActiveTab('/message');
		} else if (path.startsWith('/document')) {
			setActiveTab('/document');
		} else if (path.startsWith('/blog')) {
			setActiveTab('/blog');
		}
	}, [location]);

	useEffect(() => {
		if (authUser) {
			getLatestNotification();
		}
	}, [authUser, getLatestNotification]);

	const handleClickLogin = () => {
		modalElement?.showModal();
		setIsShowingModal(true);
		setModalFor('login');
	};

	const handleClickItem = (title?: string) => {
		if (title === 'Log out') {
			logoutUser();
		}
	};

	const setCloseNotification = () => {
		setNotificationsOpen(false);
	};

	let NavComp = 'div' as React.ElementType;
	if (authUser) {
		NavComp = NavLink;
	}

	const itemNoAuth = [...SidebarHomeItems];
	itemNoAuth.splice(3, 1);

	return (
		<div className='max-xl:flex items-center justify-around max-md:px-2 w-full h-20 bg-base-200 shadow-md shadow-base-300'>
			<MobileNavbar
				items={
					authUser && ['STUDENT', 'TUTOR'].includes(authUser?.roles[0]?.code)
						? SidebarHomeItems
						: itemNoAuth
				}
				page={'home'}
			/>
			{/* Large screen nav */}
			<div className='hidden xl:flex flex-row items-center justify-between container mx-auto px-8 max-[821px]:px-2 w-full h-full '>
				<div className='w-36 h-full'>
					<Link
						to={'/'}
						className='h-full flex items-center cursor-pointer'
					>
						<img
							className='w-full h-full object-cover'
							src='/logo.webp'
							alt='Logo'
						/>
					</Link>
				</div>
				<nav className='h-12 flex flex-row gap-6 relative'>
					{/* Background indicator */}
					<motion.div
						className='absolute bg-base-300 rounded-xl h-full z-0'
						animate={{
							width: '4rem', // 16 in tailwind
							x:
								activeTab === '/'
									? 0
									: activeTab === '/message'
									? 'calc(4rem + 1.5rem)'
									: activeTab === '/document'
									? 'calc(8rem + 3rem)'
									: activeTab === '/blog' &&
									  authUser &&
									  ['STUDENT', 'TUTOR'].includes(authUser?.roles[0]?.code)
									? 'calc(12rem + 4.5rem)'
									: activeTab === '/blog'
									? 'calc(8rem + 3rem)' // Adjusted position when document item is not shown
									: 0,
						}}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30,
						}}
					/>

					<NavLink
						to={'/'}
						className='w-16 h-full flex items-center justify-center cursor-pointer relative z-10'
						onClick={() => setActiveTab('/')}
					>
						<House className='w-8 h-8' />
					</NavLink>

					<div
						className='tooltip tooltip-bottom'
						data-tip='Chatting'
					>
						<NavComp
							to={'/message'}
							className='w-16 h-full flex items-center justify-center cursor-pointer relative z-10'
							onClick={() => {
								setActiveTab('/message');
								if (!authUser) {
									handleClickLogin();
								}
							}}
						>
							<MessageCircleMore className='w-8 h-8' />
						</NavComp>
					</div>

					{/* Document link */}
					{authUser && ['STUDENT', 'TUTOR'].includes(authUser?.roles[0]?.code) && (
						<div
							className='tooltip tooltip-bottom'
							data-tip='Document'
						>
							<NavComp
								to={'/document'}
								className='w-16 h-full flex items-center justify-center cursor-pointer relative z-10'
								onClick={() => {
									setActiveTab('/document');
									if (!authUser) {
										handleClickLogin();
									}
								}}
							>
								<Folder className='w-8 h-8' />
							</NavComp>
						</div>
					)}

					{/* Blog link */}
					<div
						className='tooltip tooltip-bottom'
						data-tip='Blog'
					>
						<NavLink
							to={'/blog'}
							className='w-16 h-full flex items-center justify-center cursor-pointer relative z-10'
							onClick={() => setActiveTab('/blog')}
						>
							<BookOpen className='w-8 h-8' />
						</NavLink>
					</div>
				</nav>
				<div className='flex flex-row h-full items-center gap-8'>
					{authUser && authUser.roles?.[0]?.code === 'STAFF' && (
						<Link
							to={'/management'}
							className='btn btn-ghost font-bold'
						>
							Management
						</Link>
					)}
					<div className='form-control'>
						<input
							type='text'
							placeholder='Search'
							className='input input-bordered border-2 rounded-full w-24 h-10 md:w-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
						/>
					</div>

					{authUser ? (
						<>
							{/* Notification */}
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
													closeNotification={setCloseNotification}
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

							{/* User info */}
							<div className='flex flex-col items-end justify-center'>
								<p className='font-bold'>{authUser?.name}</p>
								<p className='text-sm'>{transformRole(authUser?.roles[0]?.code)}</p>
							</div>
							{/* Avatar */}
							<div className={`dropdown dropdown-end dropdown-bottom`}>
								<Dropdown
									items={UserDropdownItems}
									variant={'user'}
									onClick={handleClickItem}
								>
									<div
										tabIndex={0}
										className='avatar cursor-pointer'
									>
										<div className='w-14 rounded-full'>
											<img
												src={authUser?.profilePicUrl?.toString()}
												alt='Avatar'
											/>
										</div>
									</div>
								</Dropdown>
							</div>
						</>
					) : (
						<div className='flex flex-row gap-1'>
							<button
								className='btn btn-secondary rounded-xl'
								onClick={handleClickLogin}
							>
								Log in
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
