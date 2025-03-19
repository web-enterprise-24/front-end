import { Outlet } from 'react-router-dom';
import { NavbarOnlyAvatar, SidebarFixed } from '../../components';
import { SidebarDashboardItems } from '../../constants';

const Dashboard = () => {
	return (
		<>
			<NavbarOnlyAvatar
				items={SidebarDashboardItems}
				page={'dashboard'}
			/>
			<div className='flex flex-row justify-between w-full h-[calc(100vh-64px-4px)] bg-base-300'>
				<SidebarFixed items={SidebarDashboardItems} />
				<div className='w-full h-full xl:ml-1 mt-1 shadow-md shadow-base-100 bg-base-100 overflow-y-auto'>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
