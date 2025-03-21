import { create } from 'zustand';
import {
	StaffOverviewMetricType,
	StaffTuteesInformationType,
	StaffTutorActivityType,
	StaffTutorPerformanceType,
	StudentActivityType,
	StudentOverviewMetricsType,
	StudentRecentUploadedDocumentType,
	StudentTutorProfileType,
	TutorFeedbackAnalysisType,
	TutorOverviewMetricsType,
	TutorRecentlyUploadedDocumentType,
	TutorTuteeActivityType,
	TutorUpcomingMeetingType,
} from '../types';
import {
	getFeedbackAnalysis,
	getOverviewMetrics,
	getOverviewMetricsTutee,
	getRecentlyUploadedDocuments,
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
} from '../services';
import { AxiosError } from 'axios';
import useAuthStore from './authStore';

type DashboardStoreType = {
	// general
	overviewMetrics: StaffOverviewMetricType | TutorOverviewMetricsType | null;
	// staff
	tutorActivity: StaffTutorActivityType | null;
	tutorPerformance: StaffTutorPerformanceType[] | null;
	// tutor
	tuteesInformation: StaffTuteesInformationType[] | null;
	recentlyUploadedDocuments: TutorRecentlyUploadedDocumentType[] | null;
	upcomingMeetings: TutorUpcomingMeetingType[] | null;
	tuteesActivity: TutorTuteeActivityType | null;
	feedbackAnalysis: TutorFeedbackAnalysisType | null;
	currentPage: number;
	previousPage: string;
	nextPage: string;
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
	getTutorPerformance: () => void;
	// tutor
	getTuteesInformation: (link: string) => void;
	getRecentlyUploadedDocuments: () => void;
	getUpcomingMeetings: () => void;
	getTuteesActivity: (timeRange: string) => void;
	getFeedbackAnalysis: (timeRange: string) => void;
	setCurrentPage: (page: number) => void;
	// student
	getTutorProfile: () => void;
	getStudentOverviewMetrics: () => void;
	getStudentUpcomingMeetings: () => void;
	getStudentRecentlyUploadedDocuments: () => void;
	getStudentActivity: (timeRange: string) => void;
};

const useDashboardStore = create<DashboardStoreType>((set, get) => ({
	// general
	overviewMetrics: null,
	// staff
	tutorActivity: null,
	tutorPerformance: null,
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
	// tutor
	getTuteesInformation: async (link = '') => {
		set({ isGettingTuteesInformation: true });
		try {
			const res = await getTuteesInformation(link);
			set({
				tuteesInformation: res.tutees,
				previousPage: res.pagination.previousPage || '',
				nextPage: res.pagination.nextPage || '',
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
			console.log(get().recentlyUploadedDocuments);
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
	setCurrentPage: (page: number) => {
		set({ currentPage: get().currentPage + page });
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
			console.log(get().studentActivity);
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
