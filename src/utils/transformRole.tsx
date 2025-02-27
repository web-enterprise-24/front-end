const transformRole = (role: string): string => {
 return role.charAt(0) + role.slice(1).toLowerCase();
};

export default transformRole;
