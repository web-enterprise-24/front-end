import StaffTuteesInformationType from './StaffTuteesInformationType';
import TutorOverviewMetricsType from './TutorOverviewMetricsType';
import TutorRecentlyUploadedDocumentType from './TutorRecentlyUploadedDocumentType';
import TutorUpcomingMeetingType from './TutorUpcomingMeetingType';

type TutorDashboardType = {
	metrics: TutorOverviewMetricsType;
	tutees: {
		tutees: StaffTuteesInformationType[];
	};
	upcomingMeetings: TutorUpcomingMeetingType[];
	recentDocuments: TutorRecentlyUploadedDocumentType[];
	tuteesActivity: { messages: number; meetings: number; documents: number }[];
	documentFeedback: { documentsReceived: number; feedbackProvided: number }[];
};

export default TutorDashboardType;
