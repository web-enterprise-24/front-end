import { useAuthStore } from '../../../store';

import StaffDashboard from './StaffDashboard';
import StudentDashboard from './StudentDashboard';
import TutorDashboard from './TutorDashboard';

const DetailedDashboard = () => {
	const authUser = useAuthStore((state) => state.authUser);

	return (
		<div className='w-full h-full p-8 max-sm:p-2 bg-base-100'>
			<div className='flex flex-col gap-8'>
				<h1 className='text-xl font-bold'>Main Dashboard</h1>
				{authUser?.roles[0].code === 'STAFF' && <StaffDashboard />}
				{authUser?.roles[0].code === 'TUTOR' && <TutorDashboard />}
				{authUser?.roles[0].code === 'STUDENT' && <StudentDashboard />}
			</div>
			<div className='h-8'></div>
		</div>
	);
};

export default DetailedDashboard;
