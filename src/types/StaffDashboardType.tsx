import StaffAccessedPageType from './StaffAccessedPageType';
import StaffActiveUserType from './StaffActiveUserType';
import StaffDashboardAllocationType from './StaffDashboardAllocationType';
import StaffDashboardUnallocationType from './StaffDashboardUnallocationType';
import StaffOverviewMetricType from './StaffOverviewMetricType';
import StaffTutorPerformanceType from './StaffTutorPerformanceType';
import StaffUsedBrowserType from './StaffUsedBrowserType';
import StaffUserLoginStatsType from './StaffUserLoginStatsType';

type StaffDashboardType = {
	overviewMetrics: StaffOverviewMetricType;
	tutorActivity: {
		meetings: number;
		messages: number;
	}[];
	tutorPerformance: StaffTutorPerformanceType[];
	userLoginStats: StaffUserLoginStatsType[];
	activeUsers: StaffActiveUserType[];
	accessedPages: StaffAccessedPageType[];
	usedBrowsers: StaffUsedBrowserType[];
	allocationCreators: StaffDashboardAllocationType[];
	allocationCancelers: StaffDashboardUnallocationType[];
};

export default StaffDashboardType;
