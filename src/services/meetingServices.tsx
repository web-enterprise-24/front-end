import { isAxiosError } from 'axios';
import { axios } from '../utils';
import { RequestMeetingType } from '../types';

export const getMyMeetings = async () => {
	try {
		const res = await axios.get('/meeting');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getTutorMeetings = async () => {
	try {
		const res = await axios.get('/meeting/tutor');
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const createMeeting = async (data: RequestMeetingType) => {
	try {
		console.log(data);
		const res = await axios.post('/meeting', data);
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const acceptMeeting = async (meetingId: string) => {
	try {
		const res = await axios.post(`/meeting/accept`, { meetingId });
		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const declineMeeting = async (meetingId: string) => {
	try {
		await axios.delete(`/meeting/cancel`, { data: { meetingId } });
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const storeRecord = async (fileUrl: string, meetingId: string) => {
	try {
		await axios.post(`/meeting/record`, { meetingId, fileUrl });
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
