type RoleType = {
 _id: string;
 code: string;
 status: boolean;
 createdAt: string;
 updatedAt: string;
};

type UserType = {
 id: string;
 name: string;
 roles: RoleType[];
 email: string;
 profilePicUrl: string;
};

export default UserType;
