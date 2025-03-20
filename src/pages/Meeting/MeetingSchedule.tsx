import { useMeetingStore } from '../../store';
import MeetingItem from './MeetingItem';
import { useRef, useState } from 'react';
import { Clock, Mic } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import { Overlay } from '../../components';
import ConfirmModal from '../../components/ConfirmModal';

const MeetingSchedule = () => {
	const [meetings, isAcceptingMeeting, acceptMeeting] = useMeetingStore(
		useShallow((state) => [
			state.meetings,
			state.isAcceptingMeeting,
			state.acceptMeeting,
		])
	);
	const [isRecording, setIsRecording] = useState(false);
	const [isAccepting, setIsAccepting] = useState(false);
	const [meetingId, setMeetingId] = useState('');

	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleClickAccept = (meetingId: string) => {
		setMeetingId(meetingId);
		setIsAccepting(true);

		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleClickDecline = () => {
		console.log('Decline');
	};

	const handleConfirm = () => {
		if (isAccepting) {
			acceptMeeting(meetingId);
		}
	};

	return (
		<div className='w-2/5 pt-16 '>
			{isAcceptingMeeting && <Overlay isOpenLoader />}
			<ConfirmModal
				ref={dialogRef}
				title={`Are you sure you want to ${
					isAccepting ? 'accept' : 'decline'
				} this meeting?`}
				events={[handleConfirm]}
			/>
			<h1 className='font-bold text-xl'>Meeting Schedule</h1>
			{/* Current meeting */}
			{isRecording && (
				<div className='w-full mt-6'>
					<h2 className='text-primary-content font-bold'>
						<span className='flex flex-row items-center gap-2'>
							<Clock className='text-primary' /> Currently In Progress
						</span>
					</h2>
					<div className='w-full flex flex-row items-center justify-between border-2 border-success rounded-lg p-6 bg-primary/10 mt-2'>
						<div className='w-full flex flex-row gap-2 items-center'>
							<div className='flex flex-col gap-2'>
								<p className='font-bold text-lg text-success'>Weekly Team Sync</p>
								<p className='text-primary-content'>
									<span>2025-3-18</span> at <span>09:00 AM</span>
								</p>
							</div>
							<span className='py-1 px-2 bg-primary/40 text-success text-xs animate-pulse self-start rounded-full'>
								LIVE
							</span>
						</div>
						{/* Record button */}
						<span
							className={`min-w-40 flex flex-row items-center gap-2 p-2 rounded-full bg-base-200 text-primary-content text-sm cursor-pointer ${
								isRecording && 'bg-error !text-base-100 animate-pulse'
							}`}
							onClick={() => setIsRecording(!isRecording)}
						>
							<Mic /> {isRecording ? 'Recording...' : 'Start Recording'}
						</span>
					</div>
				</div>
			)}
			<div className='w-full mt-4 flex flex-col gap-4 max-h-[590px] overflow-y-auto'>
				{meetings &&
					meetings.map((meeting) => (
						<MeetingItem
							key={meeting.id}
							data={meeting}
							onClickAccept={handleClickAccept}
							onClickDecline={handleClickDecline}
						/>
					))}
			</div>
		</div>
	);
};

export default MeetingSchedule;
