import { useEffect } from 'react';
import Calendar from './Calendar';
import MeetingSchedule from './MeetingSchedule';
import { useMeetingStore } from '../../store';

const Meeting = () => {
	const getMeetings = useMeetingStore((state) => state.getMeetings);

	useEffect(() => {
		getMeetings();
	}, [getMeetings]);

	return (
		<div className='w-3/4 mx-auto min-h-full py-6'>
			<div className='w-full h-full flex flex-row gap-6'>
				<Calendar />
				<MeetingSchedule />
			</div>
		</div>
	);
};

export default Meeting;
