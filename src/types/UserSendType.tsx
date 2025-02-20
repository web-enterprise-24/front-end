type StudentSendType = {
 name?: string;
 role?: "STUDENT" | "TUTOR" | "STAFF";
 email?: string;
 profilePicUrl?: string | ArrayBuffer;
 dateOfBirth: string;
 gender: string;
 address?: string;
 city?: string;
 country?: string;
};

export default StudentSendType;
