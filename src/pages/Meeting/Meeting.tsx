import { useEffect } from 'react';
import Calendar from './Calendar';
import MeetingSchedule from './MeetingSchedule';
import { useGeneralStore, useMeetingStore } from '../../store';

const Meeting = () => {
	const getMeetings = useMeetingStore((state) => state.getMeetings);
	const pageAccumulator = useGeneralStore((state) => state.pageAccumulator);

	useEffect(() => {
		pageAccumulator('meeting_schedule');
	}, [pageAccumulator]);

	useEffect(() => {
		getMeetings();
	}, [getMeetings]);

	return (
		<div className='w-full md:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto min-h-full py-6 px-4'>
			<div className='w-full flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-120px)]'>
				<Calendar />
				<MeetingSchedule />
			</div>
		</div>
	);
};

export default Meeting;
