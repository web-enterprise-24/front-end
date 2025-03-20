import { CalendarCheck2, CircleAlert } from 'lucide-react';
import { MeetingType } from '../../types';
import { convertDate, convertTime } from '../../utils';

type PropsType = {
	data: MeetingType;
	onClickAccept: (meetingId: string) => void;
	onClickDecline: (meetingId: string) => void;
};

const MeetingItem = ({ data, onClickAccept, onClickDecline }: PropsType) => {
	return (
		<div
			className={`w-full flex flex-col gap-2 rounded-lg border border-primary-content/10 ${
				!data?.accepted && 'p-2'
			}`}
		>
			<div className='w-full p-4 flex flex-row items-center justify-between '>
				<div className='flex flex-col gap-2'>
					<p className='font-bold'>
						Meeting: {data.studentId.slice(-8)} & {data.tutorId.slice(-8)}
					</p>
					<p className='text-primary-content/40'>
						<span>{convertDate(data?.start)}</span> at{' '}
						<span>{convertTime(data?.start)}</span>
					</p>
				</div>
				{data?.accepted && (
					<span className='bg-secondary/10 text-secondary text-sm rounded-full flex flex-row items-center gap-2 p-2'>
						<CalendarCheck2 /> Upcoming
					</span>
				)}
				{!data?.accepted && (
					<span className='bg-warning/10 text-accent text-sm rounded-full flex flex-row items-center gap-2 p-2'>
						<CircleAlert /> Awaiting Response
					</span>
				)}
				{/* <span className='bg-error/10 text-error text-sm rounded-full flex flex-row items-center gap-2 p-2'>
				<X /> Declined
			</span> */}
				{/* <span className='bg-base-200 text-primary-content text-sm rounded-full flex flex-row items-center gap-2 p-2'>
				<X /> Completed
			</span> */}
			</div>
			{/* action */}
			{!data?.accepted && (
				<div className='w-full p-4 flex flex-row gap-4 items-center justify-end border-t border-primary-content/10'>
					<button
						className='btn btn-secondary btn-sm'
						onClick={() => onClickAccept(data.id)}
					>
						Accept
					</button>
					<button
						className='btn btn-sm'
						onClick={() => onClickDecline(data.id)}
					>
						Decline
					</button>
				</div>
			)}
		</div>
	);
};

export default MeetingItem;
