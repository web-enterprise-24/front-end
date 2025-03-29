import { isAxiosError } from 'axios';
import { axios } from '../utils';

// Staff
export const getOverviewMetrics = async () => {
	try {
		const res = await axios.get('/admin/overviewMetrics');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getTutorActivity = async () => {
	try {
		const res = await axios.get('/admin/tutorActivity');
		return res.data.data.activity;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getTutorPerformance = async () => {
	try {
		const res = await axios.get('/admin/tutorPerformance');
		return res.data.data.performance;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getActiveUsers = async () => {
	try {
		const res = await axios.get('/admin/getActiveUsers');
		return res.data.data.activeUsers;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getAccessedPages = async () => {
	try {
		const res = await axios.get('/admin/getAccessedPages');
		return res.data.data.accessedPages;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getUsedBrowser = async () => {
	try {
		const res = await axios.get('/admin/getUsedBrowsers');
		return res.data.data.usedBrowsers;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getUserLoginStats = async () => {
	try {
		const res = await axios.get('/admin/userLoginStats');
		return res.data.data.userStats;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

// Tutor
export const getTutorOverviewMetrics = async () => {
	try {
		const res = await axios.get('/tutor/tutorOverviewMetrics');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getTuteesInformation = async () => {
	try {
		const res = await axios.get('/tutor/tuteesInformation');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getRecentlyUploadedDocuments = async () => {
	try {
		const res = await axios.get('/tutor/recentlyUploadedDocuments');
		return res.data.data.documents;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getUpcomingMeetings = async () => {
	try {
		const res = await axios.get('/tutor/upcomingMeetings');
		return res.data.data.meetings;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getTuteeActivity = async (timeRange: string) => {
	try {
		const res = await axios.get(`/tutor/tuteesActivity/?timeRange=${timeRange}`);
		return res.data.data.activity;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getFeedbackAnalysis = async (timeRange: string) => {
	try {
		const res = await axios.get(
			`/tutor/documentFeedbackAnalytics/?timeRange=${timeRange}`
		);
		return res.data.data.analytics;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

// Tutee
export const getTutorProfile = async () => {
	try {
		const res = await axios.get('/student/tutorProfile');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getOverviewMetricsTutee = async () => {
	try {
		const res = await axios.get('/student/studentOverviewMetrics');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getStudentUpcomingMeetings = async () => {
	try {
		const res = await axios.get('/student/upcomingMeetings');
		return res.data.data.meetings;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getStudentRecentlyUploadedDocuments = async () => {
	try {
		const res = await axios.get('/student/recentDocuments');
		return res.data.data.documents;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getStudentActivity = async (timeRange: string) => {
	try {
		const res = await axios.get(
			`/student/studentActivity/?timeRange=${timeRange}`
		);
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
