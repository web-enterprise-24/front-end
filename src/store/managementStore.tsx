import { create } from 'zustand';
import {
	UserType,
	UserSendType,
	AllocateSendType,
	StudentDashboardType,
	TutorDashboardType,
} from '../types';
// import toast from "react-hot-toast";
import { AxiosError } from 'axios';

import {
	allocation,
	changeStatus,
	createNewUser,
	deallocation,
	editProfile,
	getDashboard,
	getUsers,
} from '../services';
import toast from 'react-hot-toast';

type ManagementStoreType = {
	dashboard: StudentDashboardType | null;
	tutorDashboard: TutorDashboardType | null;
	totalPage: number | null;
	totalPageTutor: number | null;
	totalPageStudent: number | null;
	currentPage: number;
	currentPageTutor: number;
	currentPageStudent: number;
	sortBy: 'desc' | 'asc';
	searchResult: string;
	allocation: 'allocated' | 'unallocated' | '';
	selectedUser: UserType | null;
	userCreated: UserType | null;
	userLists: UserType[] | null;
	tutorLists: UserType[];
	studentLists: UserType[];
	isDisplayInactive: boolean;
	isCreatingUser: boolean;
	isGettingUserLists: boolean;
	isGettingTutorLists: boolean;
	isGettingStudentLists: boolean;
	isEditing: boolean;
	isAllocating: boolean;
	isGettingDashboard: boolean;
	createUser: (data: UserSendType) => Promise<void>;
	getUserLists: (role: string, isAllocation?: boolean) => void;
	setSelectedUser: (user: UserType | null) => void;
	editUser: (data: UserSendType, userId: string, role: string) => void;
	setCurrentPage: (num: number, reset?: boolean) => void;
	setCurrentPageTutor: (num: number, reset?: boolean) => void;
	setCurrentPageStudent: (num: number, reset?: boolean) => void;
	setDisplayInactive: (status: boolean) => void;
	changeStatusUser: (userId: string, status: boolean, role: string) => void;
	setSortBy: (sort: 'desc' | 'asc') => void;
	setSearchResult: (result: string) => void;
	reset: () => void;
	setTutorLists: () => void;
	setStudentLists: () => void;
	allocateStudent: (data: AllocateSendType) => void;
	deallocateStudent: (studentId: string) => void;
	setAllocation: (allocate: 'allocated' | 'unallocated' | '') => void;
	getDashboard: (id: string, label: string) => void;
};

const useManagementStore = create<ManagementStoreType>((set, get) => ({
	dashboard: null,
	tutorDashboard: null,
	totalPage: null,
	totalPageTutor: null,
	totalPageStudent: null,
	currentPage: 1,
	currentPageTutor: 1,
	currentPageStudent: 1,
	sortBy: 'desc' as const,
	searchResult: '',
	allocation: '' as const,
	selectedUser: null,
	userCreated: null,
	userLists: null,
	tutorLists: [],
	studentLists: [],
	isDisplayInactive: false,
	isCreatingUser: false,
	isGettingUserLists: false,
	isGettingTutorLists: false,
	isGettingStudentLists: false,
	isEditing: false,
	isAllocating: false,
	isGettingDashboard: false,

	async createUser(data: UserSendType) {
		try {
			set({ isCreatingUser: true });
			const res = await createNewUser(data);
			set({ userCreated: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				throw err;
			}
		} finally {
			set({ isCreatingUser: false });
		}
	},
	async getUserLists(role, isAllocation = false) {
		try {
			let limit = 5;
			if (!isAllocation) {
				set({ isGettingUserLists: true });
			} else if (isAllocation) {
				if (role === 'TUTOR') {
					set({ isGettingTutorLists: true });
				} else if (role === 'STUDENT') {
					set({ isGettingStudentLists: true });
				}
				limit = 10;
			}

			const res = await getUsers(
				role,
				get().currentPage,
				get().isDisplayInactive,
				limit,
				get().sortBy,
				get().searchResult,
				get().allocation
			);
			if (!isAllocation) {
				set({ userLists: res.data });
				set({ totalPage: res.totalPages });
			} else if (isAllocation) {
				if (role === 'TUTOR') {
					set({ tutorLists: [...get().tutorLists, ...res.data] });
					set({ totalPageTutor: res.totalPages });
				} else if (role === 'STUDENT') {
					set({ studentLists: [...get().studentLists, ...res.data] });
					set({ totalPageStudent: res.totalPages });
					console.log(get().studentLists);
				}
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			if (!isAllocation) {
				set({ isGettingUserLists: false });
			} else if (isAllocation) {
				if (role === 'TUTOR') {
					set({ isGettingTutorLists: false });
				} else if (role === 'STUDENT') {
					set({ isGettingStudentLists: false });
				}
			}
		}
	},
	setSelectedUser(user) {
		set({ selectedUser: user });
	},
	async editUser(data: UserSendType, userId, role) {
		try {
			set({ isEditing: true });
			await editProfile(data, userId);
			get().getUserLists(role);
			toast.success('Profile has been changed successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error('Change profile failed: ', err.response?.data?.message);
			}
		} finally {
			set({ isEditing: false });
		}
	},
	setCurrentPage(num, reset) {
		if (reset) {
			set({ currentPage: 1 });
		} else {
			set({ currentPage: get().currentPage + num });
		}
	},
	setCurrentPageTutor(num, reset) {
		if (reset) {
			set({ currentPageTutor: 1 });
			set({ currentPage: 1 });
		} else {
			set({ currentPageTutor: get().currentPageTutor + num });
			set({ currentPage: get().currentPageTutor });
		}
	},
	setCurrentPageStudent(num, reset) {
		if (reset) {
			set({ currentPageStudent: 1 });
			set({ currentPage: 1 });
		} else {
			set({ currentPageStudent: get().currentPageStudent + num });
			set({ currentPage: get().currentPageStudent });
		}
	},
	setDisplayInactive(status) {
		set({ isDisplayInactive: status });
	},
	async changeStatusUser(userId, status, role) {
		try {
			await changeStatus(userId, status);
			toast.success(`User has been ${status ? 'activated' : 'deactivated'}`);
			get().getUserLists(role);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error('Failed: ', err.response?.data?.message);
			}
		}
	},
	setSortBy(sort) {
		set({ sortBy: sort });
	},
	setSearchResult(result) {
		set({ searchResult: result });
	},
	reset() {
		set({
			totalPage: null,
			totalPageTutor: null,
			totalPageStudent: null,
			currentPage: 1,
			currentPageTutor: 1,
			currentPageStudent: 1,
			sortBy: 'desc',
			searchResult: '',
			tutorLists: [],
			studentLists: [],
			dashboard: null,
			tutorDashboard: null,
		});
	},
	setTutorLists() {
		set({ tutorLists: [] });
	},
	setStudentLists() {
		set({ studentLists: [] });
	},
	async allocateStudent(data) {
		try {
			set({ isAllocating: true });
			await allocation(data);

			// Clear and toast
			toast.success('Allocated successfully');
			set({ tutorLists: [] });
			set({ studentLists: [] });
			set({ currentPageTutor: 1 });
			set({ currentPageStudent: 1 });
			set({ currentPage: 1 });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error('Allocation failed: ', err.response?.data?.message);
			}
		} finally {
			set({ isAllocating: false });
			console.log(get().currentPage);
			//    Recall getUsers
			await get().getUserLists('TUTOR', true);
			await get().getUserLists('STUDENT', true);
		}
	},
	async deallocateStudent(studentId) {
		try {
			await deallocation(studentId);
			toast.success('Student has been deallocated successfully');
			get().getUserLists('STUDENT');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error('Deallocation failed: ', err.response?.data?.message);
			}
		}
	},

	setAllocation(allocate) {
		set({ allocation: allocate });
	},

	async getDashboard(id, label) {
		try {
			set({ isGettingDashboard: true });
			const res = await getDashboard(id, label);
			if (label === 'STUDENT') {
				set({ dashboard: res });
			} else if (label === 'TUTOR') {
				set({ tutorDashboard: res });
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingDashboard: false });
		}
	},
}));

export default useManagementStore;
