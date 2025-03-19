// import { useAuthStore } from "../../../store";

import StaffDashboard from './StaffDashboard';

const DetailedDashboard = () => {
	//  const authUser = useAuthStore((state) => state.authUser);

	return (
		<div className='w-full h-full p-8 bg-base-100'>
			<div className='flex flex-col gap-8'>
				<h1 className='text-xl font-bold'>Main Dashboard</h1>
				<StaffDashboard />
			</div>
		</div>
	);
};

export default DetailedDashboard;
