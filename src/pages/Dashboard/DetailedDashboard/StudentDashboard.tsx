import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import RecentlyUploadedDocumentItem from '../../components/RecentlyUploadedDocumentItem';
import StatisticItem from '../../components/StatisticItem';
import UpcomingMeeting from '../../components/UpcomingMeeting';
import { useDashboardStore } from '../../../store';
import { useShallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';
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
	}, [
		getStudentActivity,
		getStudentOverviewMetrics,
		getStudentRecentlyUploadedDocuments,
		getStudentUpcomingMeetings,
		getTutorProfile,
		reset,
		timeRange,
	]);
	console.log(studentActivity);
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
			<div className='flex flex-row items-center gap-4 flex-wrap mt-2'>
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
					{studentUpcomingMeetings && studentUpcomingMeetings.length > 0 && (
						<UpcomingMeeting
							data={transformUpcomingMeetingData(studentUpcomingMeetings[0].startAt)}
						/>
					)}

					{studentUpcomingMeetings && studentUpcomingMeetings.length > 1 && (
						<UpcomingMeeting
							data={transformUpcomingMeetingData(studentUpcomingMeetings[1].startAt)}
						/>
					)}

					{studentUpcomingMeetings && studentUpcomingMeetings.length > 2 && (
						<UpcomingMeeting
							data={transformUpcomingMeetingData(studentUpcomingMeetings[2].startAt)}
						/>
					)}
				</div>
			</div>
			{/* Recently document and activity */}
			<div className='w-full flex flex-row gap-4 mt-2'>
				<div className='p-4 w-2/3 border border-primary-content/10 rounded-2xl shadow-sm'>
					<h2 className='font-bold'>Recent Documents</h2>
					<div className='mt-2 w-full flex flex-col gap-1'>
						{studentRecentlyUploadedDocuments &&
							studentRecentlyUploadedDocuments.map((doc, index) => (
								<RecentlyUploadedDocumentItem
									key={index}
									data={doc}
								/>
							))}
					</div>
				</div>
				<div className='p-4 w-1/3 border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Activity</h2>
						<select
							className='select select-bordered select-xs w-xs max-w-xs'
							onChange={(e) => handleChangeTimeRange(e)}
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
						<Doughnut data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;
