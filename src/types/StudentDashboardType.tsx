import StudentActivityType from './StudentActivityType';
import StudentOverviewMetricsType from './StudentOverviewMetricsType';
import StudentRecentUploadedDocumentType from './StudentRecentUploadedDocumentType';
import StudentTutorProfileType from './StudentTutorProfileType';
import TutorUpcomingMeetingType from './TutorUpcomingMeetingType';

type StudentDashboardType = {
	tutorProfile: StudentTutorProfileType;
	metrics: StudentOverviewMetricsType;
	upcomingMeetings: TutorUpcomingMeetingType[];
	recentDocuments: StudentRecentUploadedDocumentType[];
	activity: {
		messages: number;
		meetings: number;
		documents: number;
		rawCounts: StudentActivityType;
	};
};

export default StudentDashboardType;
