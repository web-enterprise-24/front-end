import RoleType from './RolesType';

type UserType = {
	id: string;
	roles: RoleType[];
	name: string;
	email: string;
	profilePicUrl: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	city: string;
	country: string;
	verified: boolean;
	status: boolean;
	createdAt: string;
	updatedAt: string;
	requiredPasswordChange: boolean;
	firstName: string;
	lastName: string;
	myTutor?: null;
	studentAllocations?: {
		tutor: UserType;
	}[];
};

export default UserType;
