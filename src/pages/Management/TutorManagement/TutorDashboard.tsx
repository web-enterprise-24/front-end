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

import StatisticItem from '../../components/StatisticItem';
import { Link, useParams } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useGeneralStore, useManagementStore } from '../../../store';
import { useShallow } from 'zustand/shallow';
import UpcomingMeeting from '../../components/UpcomingMeeting';
import { convertTimeShortMonth } from '../../../utils';
import RecentlyUploadedDocumentItem from '../../components/RecentlyUploadedDocumentItem';
import { ArrowLeftToLine, Loader } from 'lucide-react';

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
	const pageAccumulator = useGeneralStore((state) => state.pageAccumulator);
	const [tutorDashboard, getDashboard, isGettingDashboard, reset] =
		useManagementStore(
			useShallow((state) => [
				state.tutorDashboard,
				state.getDashboard,
				state.isGettingDashboard,
				state.reset,
			])
		);
	const { tutorId } = useParams();

	useEffect(() => {
		pageAccumulator('tutor_dashboard');
	}, [pageAccumulator]);

	useEffect(() => {
		getDashboard(tutorId || '', 'TUTOR');

		return () => {
			reset();
		};
	}, [getDashboard, reset, tutorId]);

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

	const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

	// line data
	const data = {
		labels,
		datasets: [
			{
				label: 'Messages',
				data: tutorDashboard
					? tutorDashboard.tuteesActivity.map((activity) => activity.messages)
					: [],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Documents',
				data: tutorDashboard
					? tutorDashboard.tuteesActivity.map((activity) => activity.documents)
					: [],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
			{
				label: 'Meetings',
				data: tutorDashboard
					? tutorDashboard.tuteesActivity.map((activity) => activity.meetings)
					: [],
				borderColor: 'rgb(153, 102, 255)',
				backgroundColor: 'rgba(153, 102, 255, 0.5)',
			},
		],
	};

	const barData = {
		labels,
		datasets: [
			{
				label: 'Documents Received',
				data: tutorDashboard
					? tutorDashboard.documentFeedback.map(
							(feedback) => feedback.documentsReceived
					  )
					: [],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Feedback Provided',
				data: tutorDashboard
					? tutorDashboard.documentFeedback.map(
							(feedback) => feedback.feedbackProvided
					  )
					: [],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	if (!tutorDashboard && !isGettingDashboard) {
		return (
			<div className='w-full h-full flex items-center justify-center text-primary-content/40 font-bold text-lg'>
				There is no matching tutor
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
					<Link
						to={'/management/tutor-management'}
						className='btn btn-secondary btn-sm mb-4'
					>
						<ArrowLeftToLine />
						Back
					</Link>
					<h1 className='font-black text-xl'>Tutor dashboard</h1>
					<div className='w-full mt-4'>
						{/* Metrics */}
						<div className='flex flex-row min-[820px]:items-center min-[820px]:gap-4 flex-wrap max-[769px]:flex-col max-[769px]:justify-center max-[769px]:gap-2'>
							<StatisticItem
								title='total tutees'
								number={tutorDashboard?.metrics?.totalTutees || 0}
								color='text-warning border-warning'
							/>
							<StatisticItem
								title='messages'
								number={tutorDashboard?.metrics?.messages || 0}
								color='text-info border-info'
							/>
							<StatisticItem
								title='upcoming meetings'
								number={tutorDashboard?.metrics?.meetings || 0}
								color='text-error border-error'
							/>
							<StatisticItem
								title='documents needing feedback'
								number={tutorDashboard?.metrics?.documentsNeedingFeedback || 0}
								color='text-secondary border-secondary'
							/>
						</div>
						{/* Tutees information */}
						<div className='w-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
							<h2 className='font-bold'>Tutees Information</h2>
							<div className='overflow-auto mt-4 max-h-[400px]'>
								<table className='table table-zebra'>
									{/* head */}
									<thead className='bg-neutral text-base-100'>
										<tr>
											<th></th>
											<th>Student</th>
											<th>Email</th>
										</tr>
									</thead>
									<tbody>
										{tutorDashboard?.tutees?.tutees &&
										tutorDashboard?.tutees?.tutees.length > 0 ? (
											tutorDashboard?.tutees?.tutees.map((tutee, index) => (
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
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan={3}
													className='text-center font-bold text-primary-content/40'
												>
													No tutees
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
						{/* Upcoming meetings and recently documents */}
						<div className='w-full flex flex-row min-[820px]:gap-4 mt-2 max-[769px]:flex-col max-[769px]:gap-2'>
							<div className='p-4 w-1/2 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
								<h2 className='font-bold'>Upcoming Meetings</h2>
								<div className='mt-2 w-full flex flex-col gap-1'>
									{tutorDashboard?.upcomingMeetings &&
									tutorDashboard?.upcomingMeetings.length > 0 ? (
										tutorDashboard?.upcomingMeetings.map((meeting, index) => {
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
													data={{
														...transformUpcomingMeetingData(meeting.startAt),
														title: meeting.title || 'No title',
													}}
													key={index}
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
							<div className='p-4 w-1/2 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
								<h2 className='font-bold'>Recently Uploaded Documents</h2>

								<div className='mt-2 w-full flex flex-col gap-1'>
									{tutorDashboard?.recentDocuments &&
									tutorDashboard?.recentDocuments.length > 0 ? (
										tutorDashboard?.recentDocuments.map((document, index) => {
											if (index === 1 || index === 2) {
												return (
													<Fragment key={index}>
														<hr />
														<RecentlyUploadedDocumentItem data={document} />
													</Fragment>
												);
											}

											return (
												<RecentlyUploadedDocumentItem
													data={document}
													key={index}
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
						</div>
						{/* Student activity and document feedback analytics */}
						<div className='w-full flex flex-row gap-4 mt-2 max-[769px]:flex-col max-[769px]:gap-2'>
							<div className='p-4 w-1/2 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
								<h2 className='font-bold'>Student Activity</h2>
								<div className='w-full mt-4'>
									<Line
										data={data}
										options={options}
									/>
								</div>
							</div>
							<div className='p-4 w-1/2 max-[769px]:w-full border border-primary-content/10 rounded-2xl shadow-sm'>
								<h2 className='font-bold'>Document Feedback Analytics</h2>

								<div className='w-full mt-4'>
									<Bar
										data={barData}
										options={options}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='w-full h-6'></div>
				</div>
			)}
		</>
	);
};

export default TutorDashboard;
