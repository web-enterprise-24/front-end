import { create } from 'zustand';
import {
	StaffOverviewMetricType,
	StaffTutorActivityType,
	StaffTutorPerformanceType,
} from '../types';
import {
	getOverviewMetrics,
	getTutorActivity,
	getTutorPerformance,
} from '../services';
import { AxiosError } from 'axios';

type DashboardStoreType = {
	overviewMetrics: StaffOverviewMetricType | null;
	tutorActivity: StaffTutorActivityType | null;
	tutorPerformance: StaffTutorPerformanceType[] | null;
	isGettingOverviewMetrics: boolean;
	isGettingTutorActivity: boolean;
	isGettingTutorPerformance: boolean;

	getOverviewMetrics: () => void;
	getTutorActivity: () => void;
	getTutorPerformance: () => void;
};

const useDashboardStore = create<DashboardStoreType>((set) => ({
	overviewMetrics: null,
	tutorActivity: null,
	tutorPerformance: null,
	isGettingOverviewMetrics: false,
	isGettingTutorActivity: false,
	isGettingTutorPerformance: false,

	getOverviewMetrics: async () => {
		set({ isGettingOverviewMetrics: true });
		try {
			const res = await getOverviewMetrics();
			set({ overviewMetrics: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err);
			}
		} finally {
			set({ isGettingOverviewMetrics: false });
		}
	},
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
}));

export default useDashboardStore;
