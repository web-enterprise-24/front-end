import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg } from '@fullcalendar/core';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore, useMeetingStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import { convertDate, convertTime } from '../../utils';
import { Overlay } from '../../components';
import { TutorMeetingType } from '../../types';
import toast from 'react-hot-toast';

// const events = [
// 	{
// 		id: '1',
// 		title: 'Business Meeting',
// 		start: '2025-03-20',
// 		end: '2025-03-20',
// 	},
// 	{
// 		id: '2',
// 		title: 'Team Lunch',
// 		start: '2025-03-22T12:30:00',
// 		end: '2025-03-22T13:30:00',
// 	},
// 	{
// 		id: '3',
// 		title: 'Conference',
// 		start: '2025-03-25',
// 		end: '2025-03-25',
// 	},
// 	{
// 		id: '4',
// 		title: 'Product Release',
// 		start: '2025-03-15',
// 	},
// ];

const Calendar = () => {
	const authUser = useAuthStore((state) => state.authUser);
	const [
		meetings,
		tutorMeetings,
		getTutorMeetings,
		createMeeting,
		isCreatingMeeting,
	] = useMeetingStore(
		useShallow((state) => [
			state.meetings,
			state.tutorMeetings,
			state.getTutorMeetings,
			state.createMeeting,
			state.isCreatingMeeting,
		])
	);

	const [requestData, setRequestData] = useState<{
		title: string;
		start: string;
		end: string;
	}>({
		title: '',
		start: new Date().toISOString(),
		end: new Date().toISOString(),
	});
	const [schedule, setSchedule] = useState<TutorMeetingType[]>([]);

	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (authUser?.roles[0]?.code === 'STUDENT') {
			getTutorMeetings();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getTutorMeetings]);

	useEffect(() => {
		if (authUser?.roles[0]?.code === 'TUTOR') {
			let result: TutorMeetingType[] = [];
			const tutorMeetingLists = [...(meetings || [])];
			tutorMeetingLists.forEach((meeting) => {
				result = [
					...result,
					{
						id: meeting.id,
						title: meeting.title || 'No title',
						start: meeting.start,
						end: meeting.end,
					},
				];
			});
			setSchedule(result);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meetings]);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		// Create Date objects for the selected range
		const startDate = new Date(selectInfo.startStr);
		// const endDate = new Date(selectInfo.endStr);

		// Create today's date at the beginning of the day in local timezone
		const today = new Date();

		// If the start date is in the past, don't proceed
		if (startDate < today) {
			const calendarApi = selectInfo.view.calendar;
			calendarApi.unselect();

			toast.error('Cannot select dates in the past');
			return;
		}

		// Store the selected range
		setRequestData({
			...requestData,
			start: selectInfo.startStr,
			end: selectInfo.endStr,
		});

		// Open the confirmation dialog
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleConfirm = () => {
		createMeeting(requestData);

		setTimeout(() => {
			setRequestData({
				title: '',
				start: new Date().toISOString(),
				end: new Date().toISOString(),
			});
		}, 100);
	};
	return (
		<div className='w-full lg:w-3/5 h-[600px] lg:h-full'>
			{isCreatingMeeting && <Overlay isOpenLoader />}
			{/* confirm modal */}
			<dialog
				ref={dialogRef}
				className='modal'
			>
				<div className='modal-box'>
					<h3 className='font-bold text-lg text-center'>Request Meeting</h3>
					<div className='w-full flex flex-col gap-4'>
						<label className='form-control w-full'>
							<div className='label'>
								<span className='font-bold text-primary-content/80'>Meeting title</span>
							</div>
							<input
								type='text'
								value={requestData.title}
								placeholder='Enter meeting title'
								className='input input-bordered w-full'
								onChange={(e) =>
									setRequestData({ ...requestData, title: e.target.value })
								}
							/>
						</label>
						<div className='w-full bg-base-200 text-start py-2 px-4 rounded-md'>
							<p className='text-primary-content/70'>
								<span className='font-bold text-primary-content/80'>Start date:</span>{' '}
								{convertDate(requestData?.start || '')}{' '}
								{convertTime(requestData?.start || '')}
							</p>
						</div>
						<div className='w-full bg-base-200 text-start py-2 px-4 rounded-md'>
							<p className='text-primary-content/70'>
								<span className='font-bold text-primary-content/80'>End date:</span>{' '}
								{convertDate(requestData?.end || '')}{' '}
								{convertTime(requestData?.end || '')}
							</p>
						</div>
					</div>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<div className='flex flex-row gap-4 justify-center'>
								<button
									className='btn btn-secondary'
									onClick={handleConfirm}
									disabled={!requestData.title}
								>
									Confirm
								</button>
								<button
									className='btn'
									onClick={() =>
										setRequestData({
											title: '',
											start: new Date().toISOString(),
											end: new Date().toISOString(),
										})
									}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
			{/* calendar */}

			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='timeGridWeek'
				headerToolbar={{
					start: 'prev,next today',
					center: 'title',
					end: '',
				}}
				height='100%'
				selectable={authUser?.roles[0]?.code === 'STUDENT' ? true : false}
				select={handleDateSelect}
				selectMirror={true}
				selectOverlap={false}
				timeZone='local'
				events={
					authUser?.roles[0]?.code === 'STUDENT' ? tutorMeetings || [] : schedule
				}
			/>
		</div>
	);
};

export default Calendar;
