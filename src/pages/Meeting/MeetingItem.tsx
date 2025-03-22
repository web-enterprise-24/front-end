import { CircleAlert, FileMusic, Mic, X } from 'lucide-react';
import { MeetingType } from '../../types';
import { convertDate, convertTime, uploadRecord } from '../../utils';
import { useAuthStore, useGeneralStore, useMeetingStore } from '../../store';
import { useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { Overlay } from '../../components';

type PropsType = {
	data: MeetingType;
	onClickAccept: (meetingId: string) => void;
	onClickDecline: (meetingId: string) => void;
};

const MeetingItem = ({ data, onClickAccept, onClickDecline }: PropsType) => {
	const [modalElement, setIsShowingModal, setModalFor] = useGeneralStore(
		useShallow((state) => [
			state.modalElement,
			state.setIsShowingModal,
			state.setModalFor,
		])
	);
	const [storeRecord, isStoringRecord, setSelectedMeeting] = useMeetingStore(
		useShallow((state) => [
			state.storeRecord,
			state.isStoringRecord,
			state.setSelectedMeeting,
		])
	);
	const authUser = useAuthStore((state) => state.authUser);
	const [isRecording, setIsRecording] = useState(false);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			audioChunksRef.current = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data);
				}
			};

			mediaRecorder.start();
			setIsRecording(true);
		} catch (error) {
			console.error('Error accessing microphone:', error);
			alert('Failed to access microphone. Please check permissions.');
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop();
			mediaRecorderRef.current.onstop = () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
				const audioUrl = URL.createObjectURL(audioBlob);

				// Upload the audio file
				const storeRecordUrl = async () => {
					const recordUrl = await uploadRecord(audioBlob);
					storeRecord(recordUrl, data.id);
				};
				storeRecordUrl();
				// Here you can:
				// 1. Play the audio
				// const audio = new Audio(audioUrl);
				// audio.play();

				// 2. Download the audio file
				const downloadLink = document.createElement('a');
				downloadLink.href = audioUrl;
				downloadLink.download = `meeting-recording-${new Date().toISOString()}.webm`;
				downloadLink.click();

				// 3. Or send to your backend
				// sendAudioToBackend(audioBlob);

				// Stop all tracks to release the microphone
				mediaRecorderRef.current?.stream
					.getTracks()
					.forEach((track) => track.stop());
				setIsRecording(false);
			};
		}
	};

	const toggleRecording = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	const handleClickShowRecords = () => {
		setSelectedMeeting(data);

		modalElement?.showModal();
		setIsShowingModal(true);
		setModalFor('show-record');
	};

	return (
		<div className='w-full flex flex-col gap-2 rounded-lg border border-primary-content/10 p-2'>
			{isStoringRecord && <Overlay isOpenLoader />}
			<div className='w-full p-2 flex flex-row items-center justify-between '>
				<div className='flex flex-col gap-2 max-w-[70%]'>
					<p className='font-bold line-clamp-2 break-words'>
						Meeting: {data?.title || 'No title'}
					</p>
					{authUser?.roles[0]?.code === 'TUTOR' && (
						<div className='flex flex-row gap-2 items-center'>
							<div className='avatar'>
								<div className='w-10 rounded-full'>
									<img
										src={data?.student?.profilePicUrl}
										alt='Avatar'
									/>
								</div>
							</div>
							<p>{data?.student?.name}</p>
						</div>
					)}
					<p className='text-primary-content/40'>
						<span>{convertDate(data?.start)}</span> at{' '}
						<span>{convertTime(data?.start)}</span>
					</p>
				</div>
				<div>
					{/* For record */}
					{authUser?.roles[0]?.code === 'TUTOR' && data?.accepted && (
						<span
							className={`min-w-40 flex flex-row items-center gap-2 p-2 rounded-full bg-base-200 text-primary-content text-sm cursor-pointer ${
								isRecording && 'bg-error !text-base-100 animate-pulse'
							}`}
							onClick={toggleRecording}
						>
							<Mic /> {isRecording ? 'Recording...' : 'Start Recording'}
						</span>
					)}

					{!data?.accepted && (
						<span className='min-w-40 bg-warning/10 text-accent text-sm rounded-full flex flex-row items-center justify-center gap-2 p-2'>
							<CircleAlert /> Awaiting
						</span>
					)}
					{authUser?.roles[0]?.code === 'STUDENT' && data?.records.length > 0 && (
						<span className='min-w-40 bg-base-200 text-primary-content text-sm rounded-full flex flex-row items-center gap-2 p-2'>
							<X /> Completed
						</span>
					)}
				</div>
			</div>
			{/* action */}
			{
				<div className='w-full pt-2 flex flex-row gap-4 items-center justify-end border-t border-primary-content/10'>
					{!data?.accepted && authUser?.roles[0]?.code === 'TUTOR' ? (
						<>
							<button
								className='btn btn-secondary btn-sm'
								onClick={() => onClickAccept(data.id)}
							>
								Accept
							</button>
							<button
								className='btn btn-sm'
								onClick={() => onClickDecline(data.id)}
							>
								Decline
							</button>
						</>
					) : (
						<button
							className='btn btn-ghost'
							onClick={handleClickShowRecords}
						>
							<FileMusic />
						</button>
					)}
				</div>
			}
		</div>
	);
};

export default MeetingItem;
