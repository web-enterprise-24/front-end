type StaffActiveUserType = {
	role: string;
	user: {
		id: string;
		name: string;
		loginCount: number;
	};
};

export default StaffActiveUserType;
