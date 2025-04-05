type UserType = {
	id: string;
	name: string;
	email: string;
	avatar: string;
};

type StaffDashboardUnallocationType = {
	id: string;
	student: UserType;
	tutor: UserType;
	canceler: UserType;
};

export default StaffDashboardUnallocationType;
