import { Link, useParams } from 'react-router-dom';
import { ArrowLeftToLine, Loader } from 'lucide-react';
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

import StatisticItem from './StatisticItem';
import { useDashboardStore, useGeneralStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import { transformRole } from '../../utils';

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
	const pageAccumulator = useGeneralStore((state) => state.pageAccumulator);
	const [staffDashboard, getStaffDashboard, isGettingStaffDashboard] =
		useDashboardStore(
			useShallow((state) => [
				state.staffDashboard,
				state.getStaffDashboard,
				state.isGettingStaffDashboard,
			])
		);

	const { staffId } = useParams();

	useEffect(() => {
		pageAccumulator('staff_dashboard');
	}, [pageAccumulator]);

	useEffect(() => {
		getStaffDashboard(staffId || '');
	}, [getStaffDashboard, staffId]);

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

	const activeUserLabels = staffDashboard?.activeUsers?.map((user) => {
		const role = transformRole(user.role);
		return `${user?.user?.name} (${role})`;
	});
	const activeUserData = staffDashboard?.activeUsers?.map(
		(user) => user?.user?.loginCount
	);

	const accessedPagesLabels = staffDashboard?.accessedPages?.map(
		(page) => page.pageName
	);
	const accessedPagesData = staffDashboard?.accessedPages?.map(
		(page) => page.visitCount
	);

	//Polar Area Chart data
	const polarAreaChart = {
		labels: staffDashboard?.usedBrowsers?.map((browser) => browser.browser),
		datasets: [
			{
				label: '# of Votes',
				data: staffDashboard?.usedBrowsers?.map((browser) => browser.usageCount),
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

	// Line chart data
	const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
	const data = {
		labels,
		datasets: [
			{
				label: 'Meetings',
				data: staffDashboard
					? staffDashboard.tutorActivity.map((activity) => activity.meetings)
					: [],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Messages',
				data: staffDashboard
					? staffDashboard.tutorActivity.map((activity) => activity.messages)
					: [],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	// Add fallback values and better default handling
	const tutorCount = staffDashboard?.overviewMetrics?.tutors ?? 0;
	const studentCount = staffDashboard?.overviewMetrics?.students ?? 0;
	const messageCount = staffDashboard?.overviewMetrics?.messages ?? 0;

	if (isGettingStaffDashboard) {
		return (
			<div className='w-screen h-screen flex items-center justify-center'>
				<Loader className='size-30 animate-spin' />
			</div>
		);
	}

	return (
		<div className='w-2/3 max-[1025px]:w-full max-[1025px]:p-2 min-h-screen mx-auto my-6'>
			<Link
				to={'/dashboard/detailed-dashboard'}
				className='btn btn-secondary btn-sm mb-4'
			>
				<ArrowLeftToLine />
				Back
			</Link>
			<h1 className='font-black text-xl'>Staff dashboard</h1>

			<div className='w-full mt-4'>
				{/* Items */}
				<div className='flex flex-row min-[820px]:items-center min-[820px]:gap-4 flex-wrap max-[769px]:flex-col max-[769px]:gap-2 gap-2'>
					<StatisticItem
						title='tutors'
						number={tutorCount}
						color='text-accent border-accent'
					/>
					<StatisticItem
						title='students'
						number={studentCount}
						color='text-warning border-warning'
					/>
					<StatisticItem
						title='messages'
						number={messageCount}
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
								{staffDashboard?.tutorPerformance &&
									staffDashboard?.tutorPerformance.map((tutor, index) => (
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
								{staffDashboard?.userLoginStats &&
									staffDashboard?.userLoginStats.map((user, index) => (
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
								{staffDashboard?.allocationCreators &&
									staffDashboard?.allocationCreators.map((user, index) => (
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
								{staffDashboard?.allocationCancelers &&
									staffDashboard?.allocationCancelers.map((user, index) => (
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
				{/* active users, access pages and used browser */}
				<div className='w-full flex flex-row gap-2 max-[1025px]:flex-col'>
					<div className='w-1/3 max-[1025px]:w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
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
					<div className='w-1/3 max-[1025px]:w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
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
					<div className='w-1/3 max-[1025px]:w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
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
		</div>
	);
};

export default StaffDashboard;
