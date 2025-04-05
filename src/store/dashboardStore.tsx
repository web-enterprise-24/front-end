import { create } from 'zustand';
import {
	StaffAccessedPageType,
	StaffActiveUserType,
	StaffOverviewMetricType,
	TutorTuteesInformationType,
	StaffTutorActivityType,
	StaffTutorPerformanceType,
	StaffUsedBrowserType,
	StudentActivityType,
	StudentOverviewMetricsType,
	StudentRecentUploadedDocumentType,
	StudentTutorProfileType,
	TutorFeedbackAnalysisType,
	TutorOverviewMetricsType,
	TutorRecentlyUploadedDocumentType,
	TutorTuteeActivityType,
	TutorUpcomingMeetingType,
	StaffUserLoginStatsType,
	StaffDashboardAllocationType,
	StaffDashboardUnallocationType,
	UserType,
	StaffDashboardType,
} from '../types';
import {
	getAccessedPages,
	getActiveUsers,
	getAllocationCancelers,
	getAllocationCreators,
	getFeedbackAnalysis,
	getOverviewMetrics,
	getOverviewMetricsTutee,
	getRecentlyUploadedDocuments,
	getStaffDashboard,
	getStaffLists,
	getStudentActivity,
	getStudentRecentlyUploadedDocuments,
	getStudentUpcomingMeetings,
	getTuteeActivity,
	getTuteesInformation,
	getTutorActivity,
	getTutorOverviewMetrics,
	getTutorPerformance,
	getTutorProfile,
	getUpcomingMeetings,
	getUsedBrowser,
	getUserLoginStats,
} from '../services';
import { AxiosError } from 'axios';
import useAuthStore from './authStore';

type DashboardStoreType = {
	// general
	overviewMetrics: StaffOverviewMetricType | TutorOverviewMetricsType | null;
	// staff
	tutorActivity: StaffTutorActivityType | null;
	tutorPerformance: StaffTutorPerformanceType[] | null;
	userLoginStats: StaffUserLoginStatsType[] | null;
	activeUsers: StaffActiveUserType[] | null;
	allocations: StaffDashboardAllocationType[] | null;
	unallocations: StaffDashboardUnallocationType[] | null;
	staffLists: UserType[] | null;
	accessedPages: StaffAccessedPageType[] | null;
	usedBrowsers: StaffUsedBrowserType[] | null;
	staffDashboard: StaffDashboardType | null;
	// tutor
	tuteesInformation: TutorTuteesInformationType[] | null;
	recentlyUploadedDocuments: TutorRecentlyUploadedDocumentType[] | null;
	upcomingMeetings: TutorUpcomingMeetingType[] | null;
	tuteesActivity: TutorTuteeActivityType | null;
	feedbackAnalysis: TutorFeedbackAnalysisType | null;
	// student
	tutorProfile: StudentTutorProfileType | null;
	studentOverviewMetrics: StudentOverviewMetricsType | null;
	studentUpcomingMeetings: TutorUpcomingMeetingType[] | null;
	studentRecentlyUploadedDocuments: StudentRecentUploadedDocumentType[] | null;
	studentActivity: StudentActivityType | null;
	// general
	isGettingOverviewMetrics: boolean;
	// staff
	isGettingTutorActivity: boolean;
	isGettingTutorPerformance: boolean;
	isGettingStaffDashboard: boolean;
	// tutor
	isGettingTuteesInformation: boolean;
	isGettingRecentlyUploadedDocuments: boolean;
	isGettingUpcomingMeetings: boolean;
	isGettingTuteesActivity: boolean;
	isGettingFeedbackAnalysis: boolean;
	isGettingStudentActivity: boolean;
	// Student
	isGettingTutorProfile: boolean;
	isGettingStudentOverviewMetrics: boolean;
	isGettingStudentUpcomingMeetings: boolean;
	isGettingStudentRecentlyUploadedDocuments: boolean;
	// general
	getOverviewMetrics: () => void;
	reset: () => void;
	// staff
	getTutorActivity: () => void;
	getAllocations: () => void;
	getUnallocations: () => void;
	getTutorPerformance: () => void;
	getUserLoginStats: () => void;
	getActiveUsers: () => void;
	getAccessedPages: () => void;
	getUsedBrowser: () => void;
	getStaffLists: () => void;
	getStaffDashboard: (id: string) => void;
	// tutor
	getTuteesInformation: () => void;
	getRecentlyUploadedDocuments: () => void;
	getUpcomingMeetings: () => void;
	getTuteesActivity: (timeRange: string) => void;
	getFeedbackAnalysis: (timeRange: string) => void;
	// student
	getTutorProfile: () => void;
	getStudentOverviewMetrics: () => void;
	getStudentUpcomingMeetings: () => void;
	getStudentRecentlyUploadedDocuments: () => void;
	getStudentActivity: (timeRange: string) => void;
};

const useDashboardStore = create<DashboardStoreType>((set) => ({
	// general
	overviewMetrics: null,
	// staff
	tutorActivity: null,
	allocations: null,
	unallocations: null,
	staffLists: null,
	tutorPerformance: null,
	userLoginStats: null,
	activeUsers: null,
	accessedPages: null,
	usedBrowsers: null,
	staffDashboard: null,
	// tutor
	tuteesInformation: null,
	recentlyUploadedDocuments: null,
	upcomingMeetings: null,
	tuteesActivity: null,
	feedbackAnalysis: null,
	currentPage: 1,
	previousPage: '',
	nextPage: '',
	// student
	tutorProfile: null,
	studentOverviewMetrics: null,
	studentUpcomingMeetings: null,
	studentRecentlyUploadedDocuments: null,
	studentActivity: null,
	// general
	isGettingOverviewMetrics: false,
	// staff
	isGettingTutorActivity: false,
	isGettingTutorPerformance: false,
	isGettingStaffDashboard: false,
	// tutor
	isGettingTuteesInformation: false,
	isGettingRecentlyUploadedDocuments: false,
	isGettingUpcomingMeetings: false,
	isGettingTuteesActivity: false,
	isGettingFeedbackAnalysis: false,
	// student
	isGettingTutorProfile: false,
	isGettingStudentOverviewMetrics: false,
	isGettingStudentUpcomingMeetings: false,
	isGettingStudentRecentlyUploadedDocuments: false,
	isGettingStudentActivity: false,

	// general
	getOverviewMetrics: async () => {
		set({ isGettingOverviewMetrics: true });
		try {
			const authUser = useAuthStore.getState().authUser;
			let res;
			if (authUser?.roles[0].code === 'STAFF') {
				res = await getOverviewMetrics();
			} else {
				res = await getTutorOverviewMetrics();
			}
			set({ overviewMetrics: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingOverviewMetrics: false });
		}
	},
	// staff
	getTutorActivity: async () => {
		set({ isGettingTutorActivity: true });
		try {
			const res = await getTutorActivity();

			// Handle the response
			const result: StaffTutorActivityType = { meetings: [], messages: [] };
			type TutorActivityItem = {
				meetings: StaffTutorActivityType['meetings'][0];
				messages: StaffTutorActivityType['messages'][0];
			};

			res.forEach((item: TutorActivityItem) => {
				result.meetings = [...result.meetings, item.meetings];
				result.messages = [...result.messages, item.messages];
			});

			set({ tutorActivity: result });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingTutorActivity: false });
		}
	},

	getTutorPerformance: async () => {
		set({ isGettingTutorPerformance: true });
		try {
			const res = await getTutorPerformance();
			set({ tutorPerformance: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingTutorPerformance: false });
		}
	},

	async getUserLoginStats() {
		try {
			const res = await getUserLoginStats();
			set({ userLoginStats: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getActiveUsers() {
		try {
			const res = await getActiveUsers();
			set({ activeUsers: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getAccessedPages() {
		try {
			const res = await getAccessedPages();
			set({ accessedPages: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getUsedBrowser() {
		try {
			const res = await getUsedBrowser();
			set({ usedBrowsers: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getAllocations() {
		try {
			const res = await getAllocationCreators();
			set({ allocations: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getUnallocations() {
		try {
			const res = await getAllocationCancelers();
			set({ unallocations: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getStaffLists() {
		try {
			const res = await getStaffLists();
			set({ staffLists: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		}
	},

	async getStaffDashboard(id) {
		try {
			set({ isGettingStaffDashboard: true });
			const res = await getStaffDashboard(id);
			set({ staffDashboard: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingStaffDashboard: false });
		}
	},

	// tutor
	async getTuteesInformation() {
		set({ isGettingTuteesInformation: true });
		try {
			const res = await getTuteesInformation();
			set({
				tuteesInformation: res.tutees,
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingTuteesInformation: false });
		}
	},

	getRecentlyUploadedDocuments: async () => {
		set({ isGettingRecentlyUploadedDocuments: true });
		try {
			const res = await getRecentlyUploadedDocuments();
			set({ recentlyUploadedDocuments: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingRecentlyUploadedDocuments: false });
		}
	},

	async getUpcomingMeetings() {
		set({ isGettingUpcomingMeetings: true });
		try {
			const res = await getUpcomingMeetings();
			set({ upcomingMeetings: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingUpcomingMeetings: false });
		}
	},

	async getTuteesActivity(timeRange) {
		set({ isGettingTuteesActivity: true });
		try {
			const res = await getTuteeActivity(timeRange);

			// Handle the response
			const result: TutorTuteeActivityType = {
				meetings: [],
				messages: [],
				documents: [],
			};
			type TutorActivityItem = {
				meetings: TutorTuteeActivityType['meetings'][0];
				messages: TutorTuteeActivityType['messages'][0];
				documents: TutorTuteeActivityType['documents'][0];
			};

			res.forEach((item: TutorActivityItem) => {
				result.meetings = [...result.meetings, item.meetings];
				result.messages = [...result.messages, item.messages];
				result.documents = [...result.documents, item.documents];
			});

			set({ tuteesActivity: result });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingTuteesActivity: false });
		}
	},

	async getFeedbackAnalysis(timeRange) {
		set({ isGettingFeedbackAnalysis: true });
		try {
			const res = await getFeedbackAnalysis(timeRange);

			// Handle the response
			const result: TutorFeedbackAnalysisType = {
				documentsReceived: [],
				feedbackProvided: [],
			};
			type TutorFeedbackAnalysisItem = {
				documentsReceived: TutorFeedbackAnalysisType['documentsReceived'][0];
				feedbackProvided: TutorFeedbackAnalysisType['feedbackProvided'][0];
			};

			res.forEach((item: TutorFeedbackAnalysisItem) => {
				result.documentsReceived = [
					...result.documentsReceived,
					item.documentsReceived,
				];
				result.feedbackProvided = [
					...result.feedbackProvided,
					item.feedbackProvided,
				];
			});

			set({ feedbackAnalysis: result });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingFeedbackAnalysis: false });
		}
	},

	// student
	getTutorProfile: async () => {
		set({ isGettingTutorProfile: true });
		try {
			const res = await getTutorProfile();
			set({ tutorProfile: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingTutorProfile: false });
		}
	},

	async getStudentOverviewMetrics() {
		set({ isGettingStudentOverviewMetrics: true });
		try {
			const res = await getOverviewMetricsTutee();
			set({ studentOverviewMetrics: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingStudentOverviewMetrics: false });
		}
	},

	async getStudentUpcomingMeetings() {
		set({ isGettingStudentUpcomingMeetings: true });
		try {
			const res = await getStudentUpcomingMeetings();
			set({ studentUpcomingMeetings: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingStudentUpcomingMeetings: false });
		}
	},

	async getStudentRecentlyUploadedDocuments() {
		set({ isGettingStudentRecentlyUploadedDocuments: true });
		try {
			const res = await getStudentRecentlyUploadedDocuments();
			set({ studentRecentlyUploadedDocuments: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingStudentRecentlyUploadedDocuments: false });
		}
	},

	getStudentActivity: async (timeRange) => {
		set({ isGettingStudentActivity: true });
		try {
			const res = await getStudentActivity(timeRange);
			set({ studentActivity: res.rawCounts });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingStudentActivity: false });
		}
	},

	reset() {
		set({
			// general
			overviewMetrics: null,
			// staff
			tutorActivity: null,
			tutorPerformance: null,
			userLoginStats: null,
			activeUsers: null,
			accessedPages: null,
			usedBrowsers: null,
			// tutor
			tuteesInformation: null,
			recentlyUploadedDocuments: null,
			upcomingMeetings: null,
			tuteesActivity: null,
			feedbackAnalysis: null,
			// student
			tutorProfile: null,
			studentOverviewMetrics: null,
			studentUpcomingMeetings: null,
			studentRecentlyUploadedDocuments: null,
			studentActivity: null,
			// general
			isGettingOverviewMetrics: false,
			// staff
			isGettingTutorActivity: false,
			isGettingTutorPerformance: false,
			// tutor
			isGettingTuteesInformation: false,
			isGettingRecentlyUploadedDocuments: false,
			isGettingUpcomingMeetings: false,
			isGettingTuteesActivity: false,
			isGettingFeedbackAnalysis: false,
			// student
			isGettingTutorProfile: false,
			isGettingStudentOverviewMetrics: false,
			isGettingStudentUpcomingMeetings: false,
			isGettingStudentRecentlyUploadedDocuments: false,
			isGettingStudentActivity: false,
		});
	},
}));

export default useDashboardStore;
