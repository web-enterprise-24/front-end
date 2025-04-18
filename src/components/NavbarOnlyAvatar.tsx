import Sidebar from './Sidebar';

import { useAuthStore, useManagementStore } from '../store';
import { SidebarType } from '../types';
import { transformRole } from '../utils';

type PropsType = {
	items: SidebarType[];
	page: string;
};

const NavbarOnlyAvatar = ({ items, page }: PropsType) => {
	const reset = useManagementStore((state) => state.reset);
	const authUser = useAuthStore((state) => state.authUser);

	const handleClick = (title: string) => {
		if (title === 'Tutor Management' || title === 'Student Management') {
			reset();
		}
	};

	return (
		<div className='w-full h-20 bg-base-200 shadow-md shadow-base-300'>
			<div className='container mx-auto px-8 max-[821px]:px-2 w-full h-full flex items-center justify-between'>
				<Sidebar
					items={items}
					page={page}
					onClick={handleClick}
				/>
				<div className='w-36 h-full'>
					<img
						className='w-full h-full object-cover'
						src='/logo.webp'
						alt='Logo'
					/>
				</div>
				<div className='hidden xl:flex flex-row items-center gap-6'>
					<div className='flex flex-col items-end justify-center'>
						<p className='font-bold'>{authUser?.name}</p>
						<p className='text-sm'>{transformRole(authUser?.roles[0]?.code || '')}</p>
					</div>
					<div className='avatar'>
						<div className='w-12 rounded-full'>
							<img
								src={authUser?.profilePicUrl?.toString()}
								alt='Avatar'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavbarOnlyAvatar;
