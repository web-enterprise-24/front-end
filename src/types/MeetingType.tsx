type MeetingType = {
	id: string;
	studentId: string;
	tutorId: string;
	start: string;
	end: string;
	status: boolean;
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
};

export default MeetingType;
