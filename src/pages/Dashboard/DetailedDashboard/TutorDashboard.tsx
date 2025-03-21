import { useEffect, useState } from 'react';
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
import { convertTimeShortMonth } from '../../../utils';

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

const transformUpcomingMeetingData = (date: string) => {
	const returnedDate = convertTimeShortMonth(date).split(',');
	const obj = { month: '', day: '', hour: '' };
	obj.month = returnedDate[0].split(' ')[0].toUpperCase();
	obj.day = returnedDate[0].split(' ')[1];
	obj.hour = returnedDate[2];

	return obj;
};

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
		getUpcomingMeetings,
		upcomingMeetings,
		getTuteesActivity,
		tuteesActivity,
		getFeedbackAnalysis,
		feedbackAnalysis,
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
			state.getUpcomingMeetings,
			state.upcomingMeetings,
			state.getTuteesActivity,
			state.tuteesActivity,
			state.getFeedbackAnalysis,
			state.feedbackAnalysis,
		])
	);

	const [timeRangeTuteesActivity, setTimeRangeTuteesActivity] =
		useState('lastWeek');
	const [timeRangeDocumentFeedback, setTimeRangeDocumentFeedback] =
		useState('thisWeek');

	useEffect(() => {
		getOverviewMetrics();
		getTuteesInformation('');
		getRecentlyUploadedDocuments();
		getUpcomingMeetings();
		getTuteesActivity(timeRangeTuteesActivity);
		getFeedbackAnalysis(timeRangeDocumentFeedback);
	}, [
		getFeedbackAnalysis,
		getOverviewMetrics,
		getRecentlyUploadedDocuments,
		getTuteesActivity,
		getTuteesInformation,
		getUpcomingMeetings,
		timeRangeDocumentFeedback,
		timeRangeTuteesActivity,
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

	const labelWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const labelMonth = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

	// line data
	const data = {
		labels: timeRangeTuteesActivity === 'lastWeek' ? labelWeek : labelMonth,
		datasets: [
			{
				label: 'Messages',
				data: tuteesActivity ? tuteesActivity.messages : [],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Documents',
				data: tuteesActivity ? tuteesActivity.documents : [],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
			{
				label: 'Meetings',
				data: tuteesActivity ? tuteesActivity.meetings : [],
				borderColor: 'rgb(153, 102, 255)',
				backgroundColor: 'rgba(153, 102, 255, 0.5)',
			},
		],
	};

	const barData = {
		labels: timeRangeDocumentFeedback === 'thisWeek' ? labelWeek : labelMonth,
		datasets: [
			{
				label: 'Documents Received',
				data: feedbackAnalysis ? feedbackAnalysis.documentsReceived : [],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Feedback Provided',
				data: feedbackAnalysis ? feedbackAnalysis.feedbackProvided : [],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const handleChangeTimeRange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		forChart: string
	) => {
		if (forChart === 'tuteesActivity') {
			setTimeRangeTuteesActivity(e.target.value);
			getTuteesActivity(e.target.value);
			return;
		}

		setTimeRangeDocumentFeedback(e.target.value);
		getFeedbackAnalysis(e.target.value);
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
											<button className='btn btn-outline btn-sm'>Message</button>
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
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Upcoming Meetings</h2>
						<button className='btn btn-secondary btn-sm'>View All</button>
					</div>
					<div className='mt-2 w-full flex flex-col gap-1'>
						{upcomingMeetings && upcomingMeetings.length > 0 && (
							<UpcomingMeeting
								data={transformUpcomingMeetingData(upcomingMeetings[0].startAt)}
							/>
						)}
						<hr />
						{upcomingMeetings && upcomingMeetings.length > 1 && (
							<UpcomingMeeting
								data={transformUpcomingMeetingData(upcomingMeetings[1].startAt)}
							/>
						)}
						<hr />
						{upcomingMeetings && upcomingMeetings.length > 2 && (
							<UpcomingMeeting
								data={transformUpcomingMeetingData(upcomingMeetings[2].startAt)}
							/>
						)}
					</div>
				</div>
				<div className='p-4 w-1/2 border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Recently Uploaded Documents</h2>
						<button className='btn btn-secondary btn-sm'>View All</button>
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
						<select
							className='select select-bordered select-xs w-xs max-w-xs'
							onChange={(e) => handleChangeTimeRange(e, 'tuteesActivity')}
						>
							<option
								selected
								value={'lastWeek'}
							>
								Last week
							</option>
							<option value={'lastMonth'}>Last month</option>
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
						<select
							className='select select-bordered select-xs w-xs max-w-xs'
							onChange={(e) => handleChangeTimeRange(e, 'documentFeedback')}
						>
							<option
								selected
								value={'thisWeek'}
							>
								Last week
							</option>
							<option value={'thisMonth'}>Last month</option>
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
