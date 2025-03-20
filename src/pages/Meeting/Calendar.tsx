import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg } from '@fullcalendar/core';
import { useCallback, useState } from 'react';

const events = [
	{
		id: '1',
		title: 'Business Meeting',
		start: '2025-03-20',
		end: '2025-03-20',
	},
	{
		id: '2',
		title: 'Team Lunch',
		start: '2025-03-22T12:30:00',
		end: '2025-03-22T13:30:00',
	},
	{
		id: '3',
		title: 'Conference',
		start: '2025-03-25',
		end: '2025-03-25',
	},
	{
		id: '4',
		title: 'Product Release',
		start: '2025-03-15',
	},
];

const Calendar = () => {
	const [selectedRange, setSelectedRange] = useState<{
		start: string;
		end: string;
	} | null>(null);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		// Create Date objects for the selected range
		const startDate = new Date(selectInfo.startStr);
		const endDate = new Date(selectInfo.endStr);

		// Create today's date at the beginning of the day in local timezone
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// If the start date is in the past, don't proceed
		if (startDate < today) {
			// Clear any previous selection
			const calendarApi = selectInfo.view.calendar;
			calendarApi.unselect();

			// Show error message
			console.log('Cannot select dates in the past');
			alert('Cannot select dates in the past');
			return;
		}

		// Check if the selected range overlaps with any existing events
		if (isRangeBooked(startDate, endDate)) {
			// Clear any previous selection
			const calendarApi = selectInfo.view.calendar;
			calendarApi.unselect();

			// Show error message
			console.log('This time range contains booked slots');
			alert('This time range contains booked slots');
			return;
		}

		// Store the selected range
		setSelectedRange({
			start: selectInfo.startStr,
			end: selectInfo.endStr,
		});

		// For demonstration, show date/time details
		console.log('Selected time range (UTC):', {
			start: selectInfo.startStr,
			end: selectInfo.endStr,
		});
		console.log('Available for booking!');
	};

	const isRangeBooked = useCallback((start: Date, end: Date) => {
		const startISO = start.toISOString();
		const endISO = end.toISOString();

		return events.some((event) => {
			// Get start and end times of the event
			const eventStart = new Date(event.start).toISOString();

			// If the event doesn't have an end time, assume it's a 1-hour event
			let eventEnd;
			if (event.end) {
				eventEnd = new Date(event.end).toISOString();
			} else {
				// Create end time by adding 1 hour to start time
				const endDate = new Date(event.start);
				endDate.setHours(endDate.getHours() + 1);
				eventEnd = endDate.toISOString();
			}

			// Check for overlap between the selected range and the event
			// Two ranges overlap if one range's start is before the other's end and
			// one range's end is after the other's start
			if (event.start.includes('T')) {
				// For events with specific times
				return startISO < eventEnd && endISO > eventStart;
			} else {
				// For all-day events, check if any day in the range matches
				const eventStartDate = eventStart.split('T')[0];
				const startDate = startISO.split('T')[0];
				const endDate = endISO.split('T')[0];

				return startDate <= eventStartDate && endDate > eventStartDate;
			}
		});
	}, []);

	return (
		<div className='w-2/3'>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='timeGridWeek'
				headerToolbar={{
					start: 'prev,next today',
					center: 'title',
					end: '',
				}}
				selectable={true}
				select={handleDateSelect}
				selectMirror={true}
				selectOverlap={false}
				timeZone='local'
				events={events}
			/>

			{selectedRange && (
				<div className='mt-4 p-4 bg-green-100 rounded-md'>
					<h3 className='font-bold'>Selected Time Range:</h3>
					<p>Start: {new Date(selectedRange.start).toLocaleString()}</p>
					<p>End: {new Date(selectedRange.end).toLocaleString()}</p>
				</div>
			)}
		</div>
	);
};

export default Calendar;
