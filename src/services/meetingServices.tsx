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
