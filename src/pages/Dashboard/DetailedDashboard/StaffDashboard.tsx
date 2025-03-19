import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import StatisticItem from '../../components/StatisticItem';
import { useDashboardStore } from '../../../store';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

// Register the required Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
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
	] = useDashboardStore(
		useShallow((state) => [
			state.getOverviewMetrics,
			state.overviewMetrics,
			state.getTutorActivity,
			state.tutorActivity,
			state.getTutorPerformance,
			state.tutorPerformance,
		])
	);

	useEffect(() => {
		getOverviewMetrics();
		getTutorActivity();
		getTutorPerformance();
	}, [getOverviewMetrics, getTutorActivity, getTutorPerformance]);

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
			<div className='flex flex-row items-center gap-4 flex-wrap'>
				<StatisticItem
					title='tutors'
					number={overviewMetrics?.tutors || 0}
				/>
				<StatisticItem
					title='students'
					number={overviewMetrics?.students || 0}
				/>
				<StatisticItem
					title='messages'
					number={overviewMetrics?.messages || 0}
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
		</div>
	);
};

export default StaffDashboard;
