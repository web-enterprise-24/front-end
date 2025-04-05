type UserType = {
	id: string;
	name: string;
	email: string;
	avatar: string;
};

type StaffDashboardAllocationType = {
	id: string;
	student: UserType;
	tutor: UserType;
	creator: UserType;
};

export default StaffDashboardAllocationType;
