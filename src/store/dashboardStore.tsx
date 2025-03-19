import { create } from 'zustand';
import {
	StaffOverviewMetricType,
	StaffTuteesInformationType,
	StaffTutorActivityType,
	StaffTutorPerformanceType,
	TutorOverviewMetricsType,
	TutorRecentlyUploadedDocumentType,
} from '../types';
import {
	getOverviewMetrics,
	getRecentlyUploadedDocuments,
	getTuteesInformation,
	getTutorActivity,
	getTutorOverviewMetrics,
	getTutorPerformance,
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
	currentPage: number;
	previousPage: string;
	nextPage: string;
	// general
	isGettingOverviewMetrics: boolean;
	// staff
	isGettingTutorActivity: boolean;
	isGettingTutorPerformance: boolean;
	// tutor
	isGettingTuteesInformation: boolean;
	isGettingRecentlyUploadedDocuments: boolean;

	// general
	getOverviewMetrics: () => void;
	// staff
	getTutorActivity: () => void;
	getTutorPerformance: () => void;
	// tutor
	getTuteesInformation: (link: string) => void;
	getRecentlyUploadedDocuments: () => void;
	setCurrentPage: (page: number) => void;
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
	currentPage: 1,
	previousPage: '',
	nextPage: '',
	// general
	isGettingOverviewMetrics: false,
	// staff
	isGettingTutorActivity: false,
	isGettingTutorPerformance: false,
	// tutor
	isGettingTuteesInformation: false,
	isGettingRecentlyUploadedDocuments: false,

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
	setCurrentPage: (page: number) => {
		set({ currentPage: get().currentPage + page });
	},
}));

export default useDashboardStore;
