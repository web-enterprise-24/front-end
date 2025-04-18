import { isAxiosError } from 'axios';
import { axios } from '../utils';

export const uploadDocument = async (data: FormData) => {
	try {
		await axios.post('/upload', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getMyDocuments = async (link: string) => {
	try {
		const res = await axios.get(link ? link : '/upload/myDocuments');

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const deleteDocument = async (id: string) => {
	try {
		await axios.delete(`/upload/document/${id}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const getStudentDocuments = async (link: string) => {
	try {
		const res = await axios.get(link ? link : '/upload/myStudentsDocuments');

		return res.data.data;
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const createFeedback = async (
	data: { message: string },
	documentId: string
) => {
	try {
		await axios.post(`/feedback/${documentId}`, data);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const updateFeedback = async (
	data: { message: string },
	feedbackId: string,
	documentId: string
) => {
	try {
		await axios.put(`/feedback/${documentId}/${feedbackId}`, data);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};

export const deleteFeedback = async (
	feedbackId: string,
	documentId: string
) => {
	try {
		await axios.delete(`/feedback/${documentId}/${feedbackId}`);
	} catch (err) {
		if (isAxiosError(err)) throw err;
	}
};
