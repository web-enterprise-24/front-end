import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import StatisticItem from '../../components/StatisticItem';
import UpcomingMeeting from '../../components/UpcomingMeeting';
import { convertTimeShortMonth } from '../../../utils';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useManagementStore } from '../../../store';
import { useShallow } from 'zustand/shallow';
import RecentlyUploadedDocumentItem from '../../components/RecentlyUploadedDocumentItem';
import { Loader } from 'lucide-react';

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
	const [dashboard, getDashboard, isGettingDashboard, reset] =
		useManagementStore(
			useShallow((state) => [
				state.dashboard,
				state.getDashboard,
				state.isGettingDashboard,
				state.reset,
			])
		);
	const { studentId } = useParams();

	useEffect(() => {
		getDashboard(studentId || '', 'STUDENT');

		return () => {
			reset();
		};
	}, [getDashboard, reset, studentId]);

	const data = {
		labels: ['Messages', 'Meetings', 'Documents'],
		datasets: [
			{
				// label: 'Activity Count',
				data: [
					dashboard?.activity?.rawCounts?.messages,
					dashboard?.activity?.rawCounts?.meetings,
					dashboard?.activity?.rawCounts?.documents,
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

	if (!dashboard && !isGettingDashboard) {
		return (
			<div className='w-full h-full flex items-center justify-center text-primary-content/40 font-bold text-lg'>
				There is no matching student
			</div>
		);
	}

	return (
		<>
			{isGettingDashboard ? (
				<div className='w-full h-full flex items-center justify-center'>
					<Loader className='animate-spin' />
				</div>
			) : (
				<div className='w-2/3 max-[769px]:w-full max-[769px]:p-2 h-full mx-auto mt-6'>
					<h1 className='font-black text-xl'>Student dashboard</h1>
					<div className='w-full mt-4'>
						{/* Tutor information */}
						<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl shadow-sm'>
							<div className='w-full h-full flex flex-row items-center justify-start gap-4'>
								<div className='avatar'>
									<div className='w-24 rounded-full'>
										<img
											src={dashboard?.tutorProfile?.avatar || ''}
											alt='Avatar'
										/>
									</div>
								</div>
								<div className='flex flex-col gap-1'>
									<p className='font-bold'>{dashboard?.tutorProfile?.name}</p>
									<p className='text-sm text-primary-content/40'>
										{dashboard?.tutorProfile?.email}
									</p>
								</div>
							</div>
						</div>
						{/* Metrics */}
						<div className='flex flex-row min-[820px]:items-center min-[820px]:gap-4 flex-wrap mt-2 max-[769px]:flex-col max-[769px]:gap-2 gap-2'>
							<StatisticItem
								title={'Messages'}
								number={dashboard?.metrics?.messages || 0}
								color='text-info border-info'
							/>
							<StatisticItem
								title={'Completed meeting'}
								number={dashboard?.metrics?.meetings || 0}
								color='text-error border-error'
							/>
							<StatisticItem
								title={'Documents'}
								number={dashboard?.metrics?.documents || 0}
								color='text-secondary border-secondary'
							/>
						</div>
						{/* Upcoming meetings */}
						<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
							<h2 className='font-bold'>Upcoming meetings</h2>
							<div className=' w-full flex flex-col gap-1'>
								{dashboard?.upcomingMeetings &&
								dashboard?.upcomingMeetings.length > 0 ? (
									dashboard?.upcomingMeetings.map((meeting, index) => {
										if (index === 1 || index === 2) {
											return (
												<>
													<hr />
													<UpcomingMeeting
														key={index}
														data={transformUpcomingMeetingData(meeting.startAt)}
													/>
												</>
											);
										}
										<UpcomingMeeting
											key={index}
											data={transformUpcomingMeetingData(meeting.startAt)}
										/>;
									})
								) : (
									<p className='font-bold text-primary-content/40 text-center'>
										No upcoming meetings
									</p>
								)}
							</div>
						</div>
						{/* Recently uploaded document and activity */}
						<div className='w-full flex flex-row min-[820px]:gap-4 mt-2 max-[769px]:flex-col max-[769px]:gap-2'>
							<div className='p-4 w-2/3 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
								<h2 className='font-bold'>Recent Documents</h2>
								<div className='mt-2 w-full flex flex-col gap-1'>
									{dashboard?.recentDocuments &&
									dashboard?.recentDocuments.length > 0 ? (
										dashboard?.recentDocuments.map((doc, index) => {
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
								<h2 className='font-bold'>Activity</h2>
								<div className='w-full mt-4'>
									<Doughnut data={data} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default StudentDashboard;
