import { House, MessageCircleMore, Bell, Folder, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import MobileNavbar from './MobileNavbar';
import { SidebarHomeItems, UserDropdownItems } from '../constants';
import Dropdown from './Dropdown';
import { useAuthStore, useGeneralStore } from '../store';
import { transformRole } from '../utils';

const Navbar = () => {
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

	let NavComp = 'div' as React.ElementType;
	if (authUser) {
		NavComp = Link;
	}

	const itemNoAuth = [...SidebarHomeItems];
	itemNoAuth.splice(3, 1);

	return (
		<div className='max-xl:flex items-center justify-around max-md:px-2 w-full h-20 bg-base-100 shadow-md shadow-base-300'>
			<MobileNavbar
				items={
					authUser && ['STUDENT', 'TUTOR'].includes(authUser.roles[0].code)
						? SidebarHomeItems
						: itemNoAuth
				}
				page={'home'}
			/>
			{/* Large screen nav */}
			<div className='hidden xl:flex flex-row justify-between container mx-auto px-8 max-[821px]:px-2 w-full h-full '>
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
				<nav className='h-full flex flex-row gap-6 '>
					<Link
						to={'/'}
						className='h-full flex items-center cursor-pointer'
					>
						<House className='w-8 h-8' />
					</Link>
					<div
						className='tooltip tooltip-bottom'
						data-tip='Chatting'
					>
						<NavComp
							to={'/message'}
							className='h-full flex items-center cursor-pointer'
							onClick={() => {
								if (!authUser) {
									handleClickLogin();
								}
							}}
						>
							<MessageCircleMore className='w-8 h-8' />
						</NavComp>
					</div>
					{authUser && ['STUDENT', 'TUTOR'].includes(authUser.roles[0].code) && (
						<div
							className='tooltip tooltip-bottom'
							data-tip='Document'
						>
							<NavComp
								to={'/document'}
								className='h-full flex items-center cursor-pointer'
								onClick={() => {
									if (!authUser) {
										handleClickLogin();
									}
								}}
							>
								<Folder className='w-8 h-8' />
							</NavComp>
						</div>
					)}
					<div
						className='tooltip tooltip-bottom'
						data-tip='Blog'
					>
						<Link
							to={'/blog'}
							className='h-full flex items-center cursor-pointer'
						>
							<BookOpen className='w-8 h-8' />
						</Link>
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
							<Dropdown
								items={[]}
								variant={'notification'}
								dropdown-open
							>
								<div
									tabIndex={0}
									className='relative w-7 h-7 cursor-pointer'
								>
									<span className='animate-ping w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline' />
									<span className='w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline' />
									<Bell className='w-full h-full' />
								</div>
							</Dropdown>
							<div className='flex flex-col items-end justify-center'>
								<p className='font-bold'>{authUser?.name}</p>
								<p className='text-sm'>{transformRole(authUser?.roles[0]?.code)}</p>
							</div>
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
						</>
					) : (
						<div className='flex flex-row gap-1'>
							<button
								className='btn btn-primary rounded-xl'
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
