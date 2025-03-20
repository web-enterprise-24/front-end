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

	const [selectedRange, setSelectedRange] = useState<{
		start: string;
		end: string;
	}>({
		start: new Date().toISOString(),
		end: new Date().toISOString(),
	});
	const [schedule, setSchedule] = useState<TutorMeetingType[]>([]);

	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		getTutorMeetings();
	}, [getTutorMeetings]);

	useEffect(() => {
		let result: TutorMeetingType[] = [];
		let tutorMeetingLists = [...(meetings || [])];
		tutorMeetingLists = tutorMeetingLists.filter(
			(meeting) => meeting.accepted === true
		);
		tutorMeetingLists.forEach((meeting) => {
			result = [
				...result,
				{
					id: meeting.id,
					title: '',
					start: meeting.start,
					end: meeting.end,
				},
			];
		});
		setSchedule(result);
		console.log('Schedule for calendar:', result);
		console.log('Raw meetings data:', meetings);
	}, [meetings]);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		// Create Date objects for the selected range
		const startDate = new Date(selectInfo.startStr);
		// const endDate = new Date(selectInfo.endStr);

		// Create today's date at the beginning of the day in local timezone
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// If the start date is in the past, don't proceed
		if (startDate < today) {
			const calendarApi = selectInfo.view.calendar;
			calendarApi.unselect();

			console.log('Cannot select dates in the past');
			alert('Cannot select dates in the past');
			return;
		}

		// Check if the selected range overlaps with any existing events
		// if (isRangeBooked(startDate, endDate)) {
		// 	// Clear any previous selection
		// 	const calendarApi = selectInfo.view.calendar;
		// 	calendarApi.unselect();

		// 	// Show error message
		// 	console.log('This time range contains booked slots');
		// 	alert('This time range contains booked slots');
		// 	return;
		// }

		// Store the selected range
		setSelectedRange({
			start: selectInfo.startStr,
			end: selectInfo.endStr,
		});

		// Open the confirmation dialog
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}

		// For demonstration, show date/time details
		console.log('Selected time range (UTC):', {
			start: selectInfo.startStr,
			end: selectInfo.endStr,
		});
		console.log('Available for booking!');
	};

	// const isRangeBooked = useCallback((start: Date, end: Date) => {
	// 	const startISO = start.toISOString();
	// 	const endISO = end.toISOString();

	// 	return events.some((event) => {
	// 		// Get start and end times of the event
	// 		const eventStart = new Date(event.start).toISOString();

	// 		// If the event doesn't have an end time, assume it's a 1-hour event
	// 		let eventEnd;
	// 		if (event.end) {
	// 			eventEnd = new Date(event.end).toISOString();
	// 		} else {
	// 			// Create end time by adding 1 hour to start time
	// 			const endDate = new Date(event.start);
	// 			endDate.setHours(endDate.getHours() + 1);
	// 			eventEnd = endDate.toISOString();
	// 		}

	// 		// Check for overlap between the selected range and the event
	// 		// Two ranges overlap if one range's start is before the other's end and
	// 		// one range's end is after the other's start
	// 		if (event.start.includes('T')) {
	// 			// For events with specific times
	// 			return startISO < eventEnd && endISO > eventStart;
	// 		} else {
	// 			// For all-day events, check if any day in the range matches
	// 			const eventStartDate = eventStart.split('T')[0];
	// 			const startDate = startISO.split('T')[0];
	// 			const endDate = endISO.split('T')[0];

	// 			return startDate <= eventStartDate && endDate > eventStartDate;
	// 		}
	// 	});
	// }, []);

	const handleConfirm = () => {
		createMeeting(selectedRange);
	};

	console.log(
		'Data passed to FullCalendar:',
		authUser?.roles[0]?.code === 'STUDENT' ? tutorMeetings || [] : schedule
	);
	return (
		<div className='w-3/5'>
			{isCreatingMeeting && <Overlay isOpenLoader />}
			{/* confirm modal */}
			<dialog
				ref={dialogRef}
				className='modal'
			>
				<div className='modal-box'>
					<h3 className='font-bold text-lg text-center'>Request Meeting</h3>
					<p className='py-4'>
						<span className='font-bold'>Start date:</span>{' '}
						{convertDate(selectedRange?.start || '')}{' '}
						{convertTime(selectedRange?.start || '')}
					</p>
					<p>
						<span className='font-bold'>End date:</span>{' '}
						{convertDate(selectedRange?.end || '')}{' '}
						{convertTime(selectedRange?.end || '')}
					</p>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<div className='flex flex-row gap-4 justify-center'>
								<button
									className='btn btn-secondary'
									onClick={handleConfirm}
								>
									Confirm
								</button>
								<button className='btn'>Cancel</button>
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
