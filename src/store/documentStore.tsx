import { create } from 'zustand';
import { StudentDocumentType, TutorDocumentType } from '../types';
import { AxiosError } from 'axios';
import {
	createFeedback,
	deleteDocument,
	deleteFeedback,
	getMyDocuments,
	getStudentDocuments,
	updateFeedback,
	uploadDocument,
} from '../services';
import toast from 'react-hot-toast';

type DocumentStoreType = {
	documents: StudentDocumentType[] | TutorDocumentType[];
	selectedDocument: StudentDocumentType | TutorDocumentType | null;
	nextPage: string;
	previousPage: string;
	currentPage: number;
	isGettingDocument: boolean;
	isUploadingDocument: boolean;
	isCreatingFeedback: boolean;
	isDeletingFeedback: boolean;
	isDeletingDocument: boolean;

	upload: (data: FormData) => void;
	getStudentDocument: (link?: string) => void;
	getTutorDocument: (link?: string) => void;
	setCurrentPage: (page: number, reset?: boolean) => void;
	setSelectedDocument: (id: string) => void;
	createFeedback: (data: { message: string }, documentId: string) => void;
	updateFeedback: (
		data: { message: string },
		feedbackId: string,
		documentId: string
	) => void;
	deleteFeedback: (feedbackId: string, documentId: string) => void;
	deleteDocument: (id: string) => void;
	reset: () => void;
};

const useDocumentStore = create<DocumentStoreType>((set, get) => ({
	documents: [],
	selectedDocument: null,
	nextPage: '',
	previousPage: '',
	currentPage: 1,
	isGettingDocument: false,
	isUploadingDocument: false,
	isCreatingFeedback: false,
	isDeletingFeedback: false,
	isDeletingDocument: false,

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
	reset() {
		set({
			documents: [],
			selectedDocument: null,
			nextPage: '',
			previousPage: '',
			currentPage: 1,
			isGettingDocument: false,
			isUploadingDocument: false,
			isCreatingFeedback: false,
			isDeletingFeedback: false,
		});
	},
	setSelectedDocument(id: string) {
		const selectedDocument = get().documents.find((doc) => doc.id === id);
		if (selectedDocument) {
			set({ selectedDocument });
		}
	},
	async createFeedback(data, documentId) {
		try {
			set({ isCreatingFeedback: true });
			await createFeedback(data, documentId);
			get().getTutorDocument();
			toast.success('Feedback created successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to create feedback: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isCreatingFeedback: false });
		}
	},
	async updateFeedback(data, feedbackId, documentId) {
		try {
			set({ isCreatingFeedback: true });
			await updateFeedback(data, feedbackId, documentId);
			get().getTutorDocument();
			toast.success('Feedback updated successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to update feedback: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isCreatingFeedback: false });
		}
	},
	async deleteFeedback(feedbackId, documentId) {
		try {
			set({ isDeletingFeedback: true });
			await deleteFeedback(feedbackId, documentId);
			get().getTutorDocument();
			toast.success('Feedback deleted successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to delete feedback: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isDeletingFeedback: false });
		}
	},
	async deleteDocument(id) {
		try {
			set({ isDeletingDocument: true });
			await deleteDocument(id);
			get().getStudentDocument();
			toast.success('Document deleted successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to delete document: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isDeletingDocument: false });
		}
	},
}));

export default useDocumentStore;
