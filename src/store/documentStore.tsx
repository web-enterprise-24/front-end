import { create } from 'zustand';
import { StudentDocumentType, TutorDocumentType } from '../types';
import { AxiosError } from 'axios';
import {
	getMyDocuments,
	getStudentDocuments,
	uploadDocument,
} from '../services';
import toast from 'react-hot-toast';

type DocumentStoreType = {
	accessToken: string | null;
	documents: StudentDocumentType[] | TutorDocumentType[];
	nextPage: string;
	previousPage: string;
	currentPage: number;
	isGettingDocument: boolean;
	isUploadingDocument: boolean;

	upload: (data: FormData) => void;
	getStudentDocument: (link?: string) => void;
	getTutorDocument: (link?: string) => void;
	setCurrentPage: (page: number) => void;
};

const accessToken = localStorage.getItem('access');

const useDocumentStore = create<DocumentStoreType>((set, get) => ({
	accessToken: accessToken || null,
	documents: [],
	nextPage: '',
	previousPage: '',
	currentPage: 1,
	isGettingDocument: false,
	isUploadingDocument: false,

	async upload(data) {
		try {
			set({ isUploadingDocument: true });
			await uploadDocument(data);
			get().getStudentDocument();
			set({
				currentPage: 1,
				previousPage: '',
				nextPage: '',
			});
			toast.success('Document uploaded successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Upload document failed: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isUploadingDocument: false });
		}
	},
	async getStudentDocument(link = '') {
		try {
			set({ isGettingDocument: true });
			const res = await getMyDocuments(link);
			set({
				documents: res.documents,
				nextPage: res.nextPage || '',
				previousPage: res.previousPage || '',
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to load documents, please try again!`);
			}
		} finally {
			set({ isGettingDocument: false });
		}
	},
	async getTutorDocument(link = '') {
		try {
			set({ isGettingDocument: true });
			const res = await getStudentDocuments(link);
			set({
				documents: res.documents,
				nextPage: res.nextPage || '',
				previousPage: res.previousPage || '',
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to load documents, please try again!`);
			}
		} finally {
			set({ isGettingDocument: false });
		}
	},
	setCurrentPage(page) {
		set({ currentPage: get().currentPage + page });
	},
}));

export default useDocumentStore;
