import RecordType from './RecordType';

type MeetingType = {
	id: string;
	studentId: string;
	tutorId: string;
	start: string;
	end: string;
	status: boolean;
	title: string;
	fileUrl: string;
	createdAt: string;
	updatedAt: string;
	accepted: boolean;
	tutor: {
		id: string;
		name: string;
		profilePicUrl: string;
	};
	student: {
		id: string;
		name: string;
		profilePicUrl: string;
	};
	records: RecordType[];
};

export default MeetingType;
