import { useEffect, useState } from 'react';
import { useMeetingStore } from '../store';
import RecordItem from './RecordItem';
import { RecordType } from '../types';

const RecordLists = () => {
	const selectedMeeting = useMeetingStore((state) => state.selectedMeeting);
	const [records, setRecords] = useState<RecordType[]>([]);
	console.log(selectedMeeting);
	useEffect(() => {
		if (selectedMeeting && selectedMeeting.records) {
			setRecords(selectedMeeting.records);
		}
	}, [selectedMeeting]);

	return (
		<div className='w-full h-full flex flex-col gap-3'>
			{records && records.length > 0 ? (
				records.map((record) => (
					<RecordItem
						key={record.id}
						data={record}
					/>
				))
			) : (
				<p className='font-bold text-primary-content/40 text-center'>
					No records found
				</p>
			)}
		</div>
	);
};

export default RecordLists;
