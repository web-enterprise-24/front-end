import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// import RecentlyUploadedDocumentItem from '../../components/RecentlyUploadedDocumentItem';
import StatisticItem from '../../components/StatisticItem';
// import UpcomingMeeting from '../../components/UpcomingMeeting';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
	const data = {
		labels: ['Messages', 'Meetings', 'Documents'],
		datasets: [
			{
				// label: 'Activity Count',
				data: [28, 19, 12], // Matched to only 3 values, corresponding to your labels
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

	return (
		<div className='w-full h-full'>
			{/* Tutor info */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl shadow-sm'>
				<div className='w-full h-full flex flex-row items-center justify-start gap-4'>
					<div className='avatar'>
						<div className='w-24 rounded-full'>
							<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='font-bold'>Dr. Maria Rodriguez</p>
						<p className='text-sm text-primary-content/40'>
							mariarodriguez@gmail.com
						</p>
						<div className='flex flex-row items-center gap-2'>
							<button className='btn btn-secondary btn-sm'>Message</button>
							<button className='btn btn-outline btn-secondary btn-sm'>
								Schedule Meeting
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Student metrics */}
			<div className='flex flex-row items-center gap-4 flex-wrap mt-2'>
				<StatisticItem
					title={'Messages'}
					number={28}
				/>
				<StatisticItem
					title={'Completed meeting'}
					number={7}
				/>
				<StatisticItem
					title={'Documents'}
					number={12}
				/>
			</div>
			{/* Upcoming meeting */}
			<div className='w-full h-full p-4 border border-primary-content/10 rounded-2xl mt-2 shadow-sm'>
				<h2 className='font-bold'>Upcoming meetings</h2>
				<div className=' w-full flex flex-col gap-1'>
					{/* <UpcomingMeeting />
					<hr />
					<UpcomingMeeting />
					<hr />
					<UpcomingMeeting /> */}
				</div>
			</div>
			{/* Recently document and activity */}
			<div className='w-full flex flex-row gap-4 mt-2'>
				<div className='p-4 w-2/3 border border-primary-content/10 rounded-2xl shadow-sm'>
					<h2 className='font-bold'>Recent Documents</h2>
					<div className='mt-2 w-full flex flex-col gap-1'>
						{/* <RecentlyUploadedDocumentItem />
						<RecentlyUploadedDocumentItem />
						<RecentlyUploadedDocumentItem />
						<RecentlyUploadedDocumentItem />
						<RecentlyUploadedDocumentItem />
						<RecentlyUploadedDocumentItem /> */}
					</div>
				</div>
				<div className='p-4 w-1/3 border border-primary-content/10 rounded-2xl shadow-sm'>
					<div className='w-full flex flex-row items-center justify-between'>
						<h2 className='font-bold'>Activity</h2>
						<select className='select select-bordered select-xs w-xs max-w-xs'>
							<option selected>Last week</option>
							<option>Last month</option>
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
