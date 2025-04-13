import { Line, Bar, PolarArea } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	RadialLinearScale,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import StatisticItem from '../../components/StatisticItem';
import { useAuthStore, useDashboardStore } from '../../../store';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { transformRole } from '../../../utils';
import { Link } from 'react-router-dom';

// Register the required Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	RadialLinearScale,
	Title,
	Tooltip,
	Legend
);

const StaffDashboard = () => {
	const [
		getOverviewMetrics,
		overviewMetrics,
		getTutorActivity,
		tutorActivity,
		getTutorPerformance,
		tutorPerformance,
		getUserLoginStats,
		userLoginStats,
		getActiveUsers,
		activeUsers,
		getAccessedPages,
		accessedPages,
		getUsedBrowser,
		usedBrowser,
		getAllocations,
		allocations,
		getUnallocations,
		unallocations,
		getStaffLists,
		staffLists,
		reset,
	] = useDashboardStore(
		useShallow((state) => [
			state.getOverviewMetrics,
			state.overviewMetrics,
			state.getTutorActivity,
			state.tutorActivity,
			state.getTutorPerformance,
			state.tutorPerformance,
			state.getUserLoginStats,
			state.userLoginStats,
			state.getActiveUsers,
			state.activeUsers,
			state.getAccessedPages,
			state.accessedPages,
			state.getUsedBrowser,
			state.usedBrowsers,
			state.getAllocations,
			state.allocations,
			state.getUnallocations,
			state.unallocations,
			state.getStaffLists,
			state.staffLists,
			state.reset,
		])
	);

	const authUser = useAuthStore((state) => state.authUser);

	useEffect(() => {
		getOverviewMetrics();
		getTutorActivity();
		getTutorPerformance();
		getUserLoginStats();
		getActiveUsers();
		getAccessedPages();
		getUsedBrowser();
		getAllocations();
		getUnallocations();
		getStaffLists();

		return () => {
			reset();
		};
	}, [
		getAccessedPages,
		getActiveUsers,
		getAllocations,
		getOverviewMetrics,
		getStaffLists,
		getTutorActivity,
		getTutorPerformance,
		getUnallocations,
		getUsedBrowser,
		getUserLoginStats,
		reset,
	]);

	// Options
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	};

	const horizontalBarOptions = {
		indexAxis: 'y' as const,
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	};

	const horizontalBarData = (
		label: string,
		labels: string[],
		data: number[]
	) => {
		return {
			labels,
			datasets: [
				{
					label,
					data,
					backgroundColor: [
						'rgba(54, 162, 235, 0.5)', // Blue for Admin
						'rgba(255, 206, 86, 0.5)', // Yellow for Tutor
						'rgba(75, 192, 192, 0.5)', // Teal for Student
					],
					borderColor: [
						'rgb(54, 162, 235)', // Blue border
						'rgb(255, 206, 86)', // Yellow border
						'rgb(75, 192, 192)', // Teal border
					],
					borderWidth: 1,
				},
			],
		};
	};

	const activeUserLabels = activeUsers?.map((user) => {
		const role = transformRole(user.role);
		return `${user?.user?.name} (${role})`;
	});
	const activeUserData = activeUsers?.map((user) => user?.user?.loginCount);

	const accessedPagesLabels = accessedPages?.map((page) => page.pageName);
	const accessedPagesData = accessedPages?.map((page) => page.visitCount);

	//Polar Area Chart data
	const polarAreaChart = {
		labels: usedBrowser?.map((browser) => browser.browser),
		datasets: [
			{
				label: '# of Votes',
				data: usedBrowser?.map((browser) => browser.usageCount),
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 206, 86, 0.5)',
					'rgba(75, 192, 192, 0.5)',
					'rgba(153, 102, 255, 0.5)',
					'rgba(255, 159, 64, 0.5)',
				],
				borderWidth: 1,
			},
		],
	};

	const polarAreaOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'right' as const,
				labels: {
					padding: 20,
					usePointStyle: true,
					pointStyle: 'circle',
				},
			},
		},
		scales: {
			r: {
				ticks: {
					backdropColor: 'transparent',
				},
			},
		},
	};

	const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

	const data = {
		labels,
		datasets: [
			{
				label: 'Meetings',
				data: tutorActivity?.meetings,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Messages',
				data: tutorActivity?.messages,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div className='w-full h-full'>
			{/* Items */}
			<div className='flex flex-row min-[820px]:items-center min-[820px]:gap-4 flex-wrap max-[769px]:flex-col max-[769px]:gap-2'>
				<StatisticItem
					title='tutors'
					number={
						overviewMetrics && 'tutors' in overviewMetrics
							? overviewMetrics.tutors
							: 0
					}
					color='text-accent border-accent'
				/>
				<StatisticItem
					title='students'
					number={
						overviewMetrics && 'students' in overviewMetrics
							? overviewMetrics.students
							: 0
					}
					color='text-warning border-warning'
				/>
				<StatisticItem
					title='messages'
					number={overviewMetrics?.messages || 0}
					color='text-info border-info'
				/>
			</div>
			{/* Tutor activity */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Tutor Activity</h2>
				<div className='w-full h-64 md:h-80'>
					<Line
						data={data}
						options={options}
					/>
				</div>
			</div>
			{/* Tutor performance */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Tutor Performance</h2>
				<div className='overflow-x-auto mt-4 max-h-[300px]'>
					<table className='table table-zebra'>
						{/* head */}
						<thead className='bg-neutral text-base-100'>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Students</th>
								<th>Meetings</th>
							</tr>
						</thead>
						<tbody>
							{tutorPerformance &&
								tutorPerformance.map((tutor, index) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<td>{tutor.name}</td>
										<td>{tutor.students}</td>
										<td>{tutor.meetings}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{/* User login stats */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>User Login Stats</h2>
				<div className='overflow-x-auto mt-4 max-h-[300px]'>
					<table className='table table-zebra'>
						{/* head */}
						<thead className='bg-neutral text-base-100'>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>Last login</th>
							</tr>
						</thead>
						<tbody>
							{userLoginStats &&
								userLoginStats.map((user, index) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.lastLogin || 'None'}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{/* Allocation */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Allocations</h2>
				<div className='overflow-x-auto mt-4 max-h-[300px]'>
					<table className='table table-zebra'>
						{/* head */}
						<thead className='bg-neutral text-base-100'>
							<tr>
								<th></th>
								<th>Staff</th>
								<th>Tutor</th>
								<th>Student</th>
							</tr>
						</thead>
						<tbody>
							{allocations &&
								allocations.map((user, index) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<td>
											<div className='flex flex-row gap-2 items-center'>
												<div className='avatar'>
													<div className='w-16 rounded-full'>
														<img
															src={user.creator.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-1 justify-center'>
													<p className='font-bold'>{user.creator.name}</p>
													<p>{user.creator.email}</p>
												</div>
											</div>
										</td>
										<td>
											<div className='flex flex-row gap-2 items-center'>
												<div className='avatar'>
													<div className='w-16 rounded-full'>
														<img
															src={user.tutor.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-1 justify-center'>
													<p className='font-bold'>{user.tutor.name}</p>
													<p>{user.tutor.email}</p>
												</div>
											</div>
										</td>
										<td>
											<div className='flex flex-row gap-2 items-center'>
												<div className='avatar'>
													<div className='w-16 rounded-full'>
														<img
															src={user.student.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-1 justify-center'>
													<p className='font-bold'>{user.student.name}</p>
													<p>{user.student.email}</p>
												</div>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{/* Deallocations */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Deallocations</h2>
				<div className='overflow-x-auto mt-4 max-h-[300px]'>
					<table className='table table-zebra'>
						{/* head */}
						<thead className='bg-neutral text-base-100'>
							<tr>
								<th></th>
								<th>Staff</th>
								<th>Tutor</th>
								<th>Student</th>
							</tr>
						</thead>
						<tbody>
							{unallocations &&
								unallocations.map((user, index) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<td>
											<div className='flex flex-row gap-2 items-center'>
												<div className='avatar'>
													<div className='w-16 rounded-full'>
														<img
															src={user.canceler.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-1 justify-center'>
													<p className='font-bold'>{user.canceler.name}</p>
													<p>{user.canceler.email}</p>
												</div>
											</div>
										</td>
										<td>
											<div className='flex flex-row gap-2 items-center'>
												<div className='avatar'>
													<div className='w-16 rounded-full'>
														<img
															src={user.tutor.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-1 justify-center'>
													<p className='font-bold'>{user.tutor.name}</p>
													<p>{user.tutor.email}</p>
												</div>
											</div>
										</td>
										<td>
											<div className='flex flex-row gap-2 items-center'>
												<div className='avatar'>
													<div className='w-16 rounded-full'>
														<img
															src={user.student.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-1 justify-center'>
													<p className='font-bold'>{user.student.name}</p>
													<p>{user.student.email}</p>
												</div>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{/* Staff lists */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Staff Lists</h2>
				<div className='overflow-x-auto mt-4 max-h-[300px]'>
					<table className='table table-zebra'>
						{/* head */}
						<thead className='bg-neutral text-base-100'>
							<tr>
								<th></th>
								<th>Staff</th>
								<th>Email</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{staffLists &&
								staffLists.map((user, index) => {
									if (authUser?.id === user.id) {
										staffLists.splice(index, 1);
									}

									return (
										<tr key={index}>
											<th>{index + 1}</th>
											<td>
												<div className='flex flex-row gap-2 items-center'>
													<div className='avatar'>
														<div className='w-16 rounded-full'>
															<img
																src={user.profilePicUrl}
																alt='Avatar'
															/>
														</div>
													</div>
													<p className='font-bold'>{user.name}</p>
												</div>
											</td>
											<td>
												<p>{user.email}</p>
											</td>
											<td>
												<Link
													to={`/staff-dashboard/${user.id}`}
													className='btn btn-secondary btn-sm'
												>
													View dashboard
												</Link>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			{/* active users, access pages and used browser */}
			<div className='w-full flex flex-row gap-2 max-[769px]:flex-col'>
				<div className='w-1/3 max-[769px]:w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
					<h2 className='font-bold'>Active Users</h2>
					<div className='w-full h-64 md:h-80'>
						<Bar
							data={horizontalBarData(
								'Active Users',
								activeUserLabels || [],
								activeUserData || []
							)}
							options={horizontalBarOptions}
						/>
					</div>
				</div>
				<div className='w-1/3 max-[769px]:w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
					<h2 className='font-bold'>Accessed Pages</h2>
					<div className='w-full h-64 md:h-80'>
						<Bar
							data={horizontalBarData(
								'Accessed Pages',
								accessedPagesLabels || [],
								accessedPagesData || []
							)}
							options={horizontalBarOptions}
						/>
					</div>
				</div>
				<div className='w-1/3 max-[769px]:w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
					<h2 className='font-bold'>Used Browsers</h2>
					<div className='w-full h-64 md:h-80'>
						<PolarArea
							data={polarAreaChart}
							options={polarAreaOptions}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StaffDashboard;
