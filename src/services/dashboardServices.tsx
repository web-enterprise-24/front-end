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

// Tutor
export const getTutorOverviewMetrics = async () => {
	try {
		const res = await axios.get('/tutor/tutorOverviewMetrics');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getTuteesInformation = async (link: string) => {
	try {
		const res = await axios.get(link ? link : '/tutor/tuteesInformation');
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
