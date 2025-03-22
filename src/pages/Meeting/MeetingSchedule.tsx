import { useMeetingStore } from '../../store';
import MeetingItem from './MeetingItem';
import { useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { Overlay } from '../../components';
import ConfirmModal from '../../components/ConfirmModal';

const MeetingSchedule = () => {
	const [
		meetings,
		isAcceptingMeeting,
		acceptMeeting,
		isDeclineMeeting,
		declineMeeting,
	] = useMeetingStore(
		useShallow((state) => [
			state.meetings,
			state.isAcceptingMeeting,
			state.acceptMeeting,
			state.isDeclineMeeting,
			state.declineMeeting,
		])
	);
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

	const handleClickDecline = (meetingId: string) => {
		setMeetingId(meetingId);
		setIsAccepting(false);

		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleConfirm = () => {
		if (isAccepting) {
			acceptMeeting(meetingId);
		} else {
			declineMeeting(meetingId);
		}
	};

	return (
		<div className='w-full lg:w-2/5 flex flex-col h-[600px] lg:h-full'>
			{(isAcceptingMeeting || isDeclineMeeting) && <Overlay isOpenLoader />}
			<ConfirmModal
				ref={dialogRef}
				title={`Are you sure you want to ${
					isAccepting ? 'accept' : 'decline'
				} this meeting?`}
				events={[handleConfirm]}
			/>
			<h1 className='font-bold text-xl mb-4'>Meeting Schedule</h1>
			<div className='w-full flex-1 flex flex-col gap-4 overflow-y-auto'>
				{meetings ? (
					meetings.map((meeting) => (
						<MeetingItem
							key={meeting.id}
							data={meeting}
							onClickAccept={handleClickAccept}
							onClickDecline={handleClickDecline}
						/>
					))
				) : (
					<div className='flex items-center justify-center h-full'>
						<p className='text-gray-500'>No meetings available</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MeetingSchedule;
