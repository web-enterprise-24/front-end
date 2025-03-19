import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { Line, Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import { useDashboardStore } from '../../../store';
import StatisticItem from '../../components/StatisticItem';
import UpcomingMeeting from '../../components/UpcomingMeeting';
import RecentlyUploadedDocumentItem from '../../components/RecentlyUploadedDocumentItem';

// Register the required Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const TutorDashboard = () => {
	const [
		getOverviewMetrics,
		overviewMetrics,
		getTuteesInformation,
		tuteesInformation,
		currentPage,
		setCurrentPage,
		previousPage,
		nextPage,
		getRecentlyUploadedDocuments,
		recentlyUploadedDocuments,
	] = useDashboardStore(
		useShallow((state) => [
			state.getOverviewMetrics,
			state.overviewMetrics,
			state.getTuteesInformation,
			state.tuteesInformation,
			state.currentPage,
			state.setCurrentPage,
			state.previousPage,
			state.nextPage,
			state.getRecentlyUploadedDocuments,
			state.recentlyUploadedDocuments,
		])
	);

	useEffect(() => {
		getOverviewMetrics();
		getTuteesInformation('');
		getRecentlyUploadedDocuments();
	}, [getOverviewMetrics, getRecentlyUploadedDocuments, getTuteesInformation]);

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

	const labels = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	// line data
	const data = {
		labels,
		datasets: [
			{
				label: 'Messages',
				data: [0, 20, 80, 30, 70, 50],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Documents',
				data: [0, 50, 60, 10, 40, 70],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
			{
				label: 'Meetings',
				data: [0, 10, 20, 30, 40, 50],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const barData = {
		labels,
		datasets: [
			{
				label: 'Documents Received',
				data: [12, 19, 8, 15, 10, 3, 0],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Feedback Provided',
				data: [15, 10, 12, 8, 7, 3, 1],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div className='w-full h-full'>
			<div className='flex flex-row items-center gap-4 flex-wrap'>
				<StatisticItem
					title='total tutees'
					number={
						overviewMetrics && 'totalTutees' in overviewMetrics
							? overviewMetrics.totalTutees
							: 0
					}
				/>
				<StatisticItem
					title='messages'
					number={
						overviewMetrics && 'messages' in overviewMetrics
							? overviewMetrics.messages
							: 0
					}
				/>
				<StatisticItem
					title='upcoming meetings'
					number={
						// overviewMetrics && 'upcomingMeetings' in overviewMetrics
						// 	? overviewMetrics.upcomingMeetings
						// 	: 0
						0
					}
				/>
				<StatisticItem
					title='documents needing feedback'
					number={
						overviewMetrics && 'documentsNeedingFeedback' in overviewMetrics
							? overviewMetrics.documentsNeedingFeedback
							: 0
					}
				/>
			</div>
			{/* Tutees information */}
			<div className='w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Tutees Information</h2>
				<div className='overflow-x-auto mt-4'>
					<table className='table table-zebra'>
						{/* head */}
						<thead className='bg-neutral text-base-100'>
							<tr>
								<th></th>
								<th>Student</th>
								<th>Email</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tuteesInformation &&
								tuteesInformation.map((tutee, index) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<td>
											<div className='flex items-center gap-3'>
												<div className='avatar'>
													<div className='mask mask-squircle h-12 w-12'>
														<img
															src={tutee.avatar}
															alt='Avatar'
														/>
													</div>
												</div>
												<div>
													<div className='font-bold'>{tutee.name}</div>
												</div>
											</div>
										</td>
										<td className='truncate max-w-[200px]'>{tutee.email}</td>
										<td>
											<button className='btn btn-outline'>Message</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
					<div className='w-full flex justify-center items-center border-t border-primary-content/10 pt-4 mt-auto'>
						<div className='join'>
							<button
								className='join-item btn'
								disabled={previousPage ? false : true}
								onClick={() => {
									setCurrentPage(-1);
									getTuteesInformation(previousPage);
								}}
							>
								«
							</button>
							<button className='join-item btn'>Page {currentPage}</button>
							<button
								className='join-item btn'
								disabled={nextPage ? false : true}
								onClick={() => {
									setCurrentPage(1);
									getTuteesInformation(nextPage);
								}}
							>
								»
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* upcoming meetings and recently uploaded documents */}
			<div className='w-full flex flex-row gap-4 mt-2'>
				<div className='p-4 w-1/2 border border-primary-content/10 rounded-2xl shadow-sm'>
					<h2 className='font-bold'>Upcoming Meetings</h2>
					<div className='mt-2 w-full flex flex-col gap-1'>
						<UpcomingMeeting />
						<hr />
						<UpcomingMeeting />
						<hr />
						<UpcomingMeeting />
					</div>
				</div>
				<div className='p-4 w-1/2 border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Recently Uploaded Documents</h2>
						<button className='btn btn-secondary'>View All</button>
					</div>
					<div className='mt-2 w-full flex flex-col gap-1'>
						<RecentlyUploadedDocumentItem
							data={recentlyUploadedDocuments && recentlyUploadedDocuments[0]}
						/>
						<hr />
						<RecentlyUploadedDocumentItem
							data={recentlyUploadedDocuments && recentlyUploadedDocuments[1]}
						/>
						<hr />
						<RecentlyUploadedDocumentItem
							data={recentlyUploadedDocuments && recentlyUploadedDocuments[2]}
						/>
					</div>
				</div>
			</div>
			{/* Student activity and document feedback analytics */}
			<div className='w-full flex flex-row gap-4 mt-2'>
				<div className='p-4 w-1/2 border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Student Activity</h2>
						<select className='select select-bordered select-xs w-xs max-w-xs'>
							<option selected>Last week</option>
							<option>Last month</option>
						</select>
					</div>
					<div className='w-full mt-4'>
						<Line
							data={data}
							options={options}
						/>
					</div>
				</div>
				<div className='p-4 w-1/2 border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Document Feedback Analytics</h2>
						<select className='select select-bordered select-xs w-xs max-w-xs'>
							<option selected>Last week</option>
							<option>Last month</option>
						</select>
					</div>
					<div className='w-full mt-4'>
						<Bar
							data={barData}
							options={options}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TutorDashboard;
