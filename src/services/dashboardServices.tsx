import { isAxiosError } from 'axios';
import { axios } from '../utils';

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
