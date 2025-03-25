import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import RecentlyUploadedDocumentItem from '../../components/RecentlyUploadedDocumentItem';
import StatisticItem from '../../components/StatisticItem';
import UpcomingMeeting from '../../components/UpcomingMeeting';
import { useDashboardStore } from '../../../store';
import { useShallow } from 'zustand/shallow';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertTimeShortMonth } from '../../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const transformUpcomingMeetingData = (date: string) => {
	const returnedDate = convertTimeShortMonth(date).split(',');
	const obj = { month: '', day: '', hour: '' };
	obj.month = returnedDate[0].split(' ')[0].toUpperCase();
	obj.day = returnedDate[0].split(' ')[1];
	obj.hour = returnedDate[2];

	return obj;
};

const StudentDashboard = () => {
	const [
		getTutorProfile,
		tutorProfile,
		getStudentOverviewMetrics,
		studentOverviewMetrics,
		getStudentUpcomingMeetings,
		studentUpcomingMeetings,
		getStudentRecentlyUploadedDocuments,
		studentRecentlyUploadedDocuments,
		getStudentActivity,
		studentActivity,
		reset,
	] = useDashboardStore(
		useShallow((state) => [
			state.getTutorProfile,
			state.tutorProfile,
			state.getStudentOverviewMetrics,
			state.studentOverviewMetrics,
			state.getStudentUpcomingMeetings,
			state.studentUpcomingMeetings,
			state.getStudentRecentlyUploadedDocuments,
			state.studentRecentlyUploadedDocuments,
			state.getStudentActivity,
			state.studentActivity,
			state.reset,
		])
	);
	const [timeRange, setTimeRange] = useState('lastWeek');

	useEffect(() => {
		getTutorProfile();
		getStudentOverviewMetrics();
		getStudentUpcomingMeetings();
		getStudentRecentlyUploadedDocuments();
		getStudentActivity(timeRange);

		return () => {
			reset();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		getStudentActivity,
		getStudentOverviewMetrics,
		getStudentRecentlyUploadedDocuments,
		getStudentUpcomingMeetings,
		getTutorProfile,
		reset,
	]);

	const data = {
		labels: ['Messages', 'Meetings', 'Documents'],
		datasets: [
			{
				// label: 'Activity Count',
				data: [
					studentActivity?.messages,
					studentActivity?.meetings,
					studentActivity?.documents,
				], // Matched to only 3 values, corresponding to your labels
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const handleChangeTimeRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTimeRange(e.target.value);
		getStudentActivity(e.target.value);
	};
	// console.log(studentUpcomingMeetings);
	return (
		<div className='w-full h-full'>
			{/* Tutor info */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl shadow-sm'>
				<div className='w-full h-full flex flex-row items-center justify-start gap-4'>
					<div className='avatar'>
						<div className='w-24 rounded-full'>
							<img src={tutorProfile?.avatar} />
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='font-bold'>{tutorProfile?.name}</p>
						<p className='text-sm text-primary-content/40'>{tutorProfile?.email}</p>
						<div className='flex flex-row items-center gap-2'>
							<Link
								to={'/message'}
								className='btn btn-secondary btn-sm'
							>
								Message
							</Link>
							<Link
								to={'/meeting-schedule'}
								className='btn btn-outline btn-secondary btn-sm'
							>
								Schedule Meeting
							</Link>
						</div>
					</div>
				</div>
			</div>
			{/* Student metrics */}
			<div className='flex flex-row min-[820px]:items-center min-[820px]:gap-4 flex-wrap mt-2 max-[769px]:flex-col max-[769px]:gap-2 gap-2'>
				<StatisticItem
					title={'Messages'}
					number={studentOverviewMetrics?.messages || 0}
					color='text-info border-info'
				/>
				<StatisticItem
					title={'Completed meeting'}
					number={studentOverviewMetrics?.meetings || 0}
					color='text-error border-error'
				/>
				<StatisticItem
					title={'Documents'}
					number={studentOverviewMetrics?.documents || 0}
					color='text-secondary border-secondary'
				/>
			</div>
			{/* Upcoming meeting */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Upcoming meetings</h2>
				<div className=' w-full flex flex-col gap-1'>
					{studentUpcomingMeetings && studentUpcomingMeetings.length > 0 ? (
						studentUpcomingMeetings.map((meeting, index) => {
							if (index === 1 || index === 2) {
								return (
									<Fragment key={index}>
										<hr />
										<UpcomingMeeting
											data={{
												...transformUpcomingMeetingData(meeting.startAt),
												title: meeting.title || 'No title',
											}}
										/>
									</Fragment>
								);
							}
							return (
								<UpcomingMeeting
									key={index}
									data={{
										...transformUpcomingMeetingData(meeting.startAt),
										title: meeting.title || 'No title',
									}}
								/>
							);
						})
					) : (
						<p className='font-bold text-primary-content/40 text-center'>
							No upcoming meetings
						</p>
					)}
				</div>
			</div>
			{/* Recently document and activity */}
			<div className='w-full flex flex-row min-[820px]:gap-4 mt-2 max-[769px]:flex-col max-[769px]:gap-2'>
				<div className='p-4 w-2/3 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Recent Documents</h2>
						<Link
							to={'/document'}
							className='btn btn-secondary btn-sm'
						>
							View all
						</Link>
					</div>
					<div className='mt-2 w-full flex flex-col gap-1'>
						{studentRecentlyUploadedDocuments &&
						studentRecentlyUploadedDocuments.length > 0 ? (
							studentRecentlyUploadedDocuments.map((doc, index) => {
								if (index === 1 || index === 2 || index === 3) {
									return (
										<Fragment key={index}>
											<hr />
											<RecentlyUploadedDocumentItem data={doc} />
										</Fragment>
									);
								}

								return (
									<RecentlyUploadedDocumentItem
										key={index}
										data={doc}
									/>
								);
							})
						) : (
							<p className='font-bold text-primary-content/40 text-center'>
								No recent documents
							</p>
						)}
					</div>
				</div>
				<div className='p-4 w-1/3 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Activity</h2>
						<select
							className='select select-bordered select-xs w-xs max-w-xs'
							defaultValue={timeRange}
							onChange={(e) => handleChangeTimeRange(e)}
						>
							<option value={'lastWeek'}>Last week</option>
							<option value={'lastMonth'}>Last month</option>
						</select>
					</div>
					<div className='w-full mt-4'>
						<Doughnut data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;
