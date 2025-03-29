import { Outlet, useLocation } from 'react-router-dom';
import { NavbarOnlyAvatar, SidebarFixed } from '../../components';

import { SidebarManagementItems } from '../../constants';

const Management = () => {
	const location = useLocation();
	const isManagementPage = !location.pathname.includes('dashboard');

	return (
		<>
			<NavbarOnlyAvatar
				items={SidebarManagementItems}
				page={'management'}
			/>
			<div className='flex flex-row justify-between h-[calc(100vh-80px-4px)] max-[1025px]:h-screen bg-base-300'>
				{isManagementPage ? (
					<>
						<SidebarFixed items={SidebarManagementItems} />
						<div className='w-full h-full xl:ml-1 mt-1 shadow-md shadow-base-100 bg-base-100'>
							<Outlet />
						</div>
					</>
				) : (
					<div className='w-full h-full bg-base-100'>
						<Outlet />
					</div>
				)}
			</div>
		</>
	);
};

export default Management;
