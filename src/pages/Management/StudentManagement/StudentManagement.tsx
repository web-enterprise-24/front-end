import Header from '../../components/HeaderManagementUser';
import { Table } from '../../../components';
import { useEffect } from 'react';
import { useManagementStore } from '../../../store';
import { Outlet, useLocation } from 'react-router-dom';

const StudentManagement = () => {
	const getUserLists = useManagementStore((state) => state.getUserLists);

	const location = useLocation();
	const isStudentManagementPage = !location.pathname.includes('dashboard');

	useEffect(() => {
		getUserLists('STUDENT');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isStudentManagementPage ? (
				<div className='w-full h-full overflow-x-auto'>
					<Header title='All Students' />
					<Table role='STUDENT' />
				</div>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default StudentManagement;
