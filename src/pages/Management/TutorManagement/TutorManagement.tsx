import { useEffect } from 'react';
import { Table } from '../../../components';
import { useManagementStore } from '../../../store';
import Header from '../../components/HeaderManagementUser';
import { Outlet, useLocation } from 'react-router-dom';

const TutorManagement = () => {
	const getUserLists = useManagementStore((state) => state.getUserLists);

	const location = useLocation();
	const isStudentManagementPage = !location.pathname.includes('dashboard');

	useEffect(() => {
		getUserLists('TUTOR');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isStudentManagementPage ? (
				<div className='w-full h-full'>
					<Header title='All Tutors' />
					<Table role='TUTOR' />
				</div>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default TutorManagement;
