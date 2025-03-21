import { create } from 'zustand';
import { MeetingType, RequestMeetingType, TutorMeetingType } from '../types';
import {
	acceptMeeting,
	createMeeting,
	declineMeeting,
	getMyMeetings,
	getTutorMeetings,
	storeRecord,
} from '../services';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type MeetingStoreType = {
	meetings: MeetingType[] | null;
	tutorMeetings: TutorMeetingType[] | null;
	isGettingMeetings: boolean;
	isCreatingMeeting: boolean;
	isAcceptingMeeting: boolean;
	isDeclineMeeting: boolean;
	isStoringRecord: boolean;

	getMeetings: () => void;
	getTutorMeetings: () => void;
	createMeeting: (data: RequestMeetingType) => void;
	acceptMeeting: (meetingId: string) => void;
	declineMeeting: (meetingId: string) => void;
	storeRecord: (fileUrl: string, meetingId: string) => void;
};

const useMeetingStore = create<MeetingStoreType>((set, get) => ({
	meetings: null,
	tutorMeetings: null,
	isGettingMeetings: false,
	isCreatingMeeting: false,
	isAcceptingMeeting: false,
	isDeclineMeeting: false,
	isStoringRecord: false,

	async getMeetings() {
		try {
			set({ isGettingMeetings: true });
			const res = await getMyMeetings();
			set({ meetings: res });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		} finally {
			set({ isGettingMeetings: false });
		}
	},
	async getTutorMeetings() {
		try {
			const res = await getTutorMeetings();

			// handle res
			let result: TutorMeetingType[] = [];
			const tutorMeetingLists = [...res];
			tutorMeetingLists.forEach((meeting) => {
				result = [
					...result,
					{
						id: meeting.id,
						title: '',
						start: meeting.start,
						end: meeting.end,
					},
				];
			});

			set({ tutorMeetings: result });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
			}
		}
	},
	async createMeeting(data) {
		try {
			set({ isCreatingMeeting: true });
			await createMeeting(data);
			get().getMeetings();
			toast.success('Meeting requested successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to create meeting: ${err.response?.data.message}`);
			}
		} finally {
			set({ isCreatingMeeting: false });
		}
	},
	async acceptMeeting(meetingId) {
		try {
			set({ isAcceptingMeeting: true });
			await acceptMeeting(meetingId);
			get().getMeetings();
			toast.success('Meeting accepted successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to accept meeting: ${err.response?.data.message}`);
			}
		} finally {
			set({ isAcceptingMeeting: false });
		}
	},
	async declineMeeting(meetingId) {
		try {
			set({ isDeclineMeeting: true });
			await declineMeeting(meetingId);
			get().getMeetings();
			toast.success('Meeting declined successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to decline meeting: ${err.response?.data.message}`);
			}
		} finally {
			set({ isDeclineMeeting: false });
		}
	},
	async storeRecord(fileUrl, meetingId) {
		try {
			set({ isStoringRecord: true });
			await storeRecord(fileUrl, meetingId);
			get().getMeetings();
			toast.success('Recording stored successfully!');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Failed to store recording: ${err.response?.data.message}`);
			}
		} finally {
			set({ isStoringRecord: false });
		}
	},
}));

export default useMeetingStore;
