import { useEffect, useRef, useState } from 'react';
import { useDocumentStore, useGeneralStore } from '../store';
import { CommentType } from '../types';
import ConfirmModal from './ConfirmModal';
import { useShallow } from 'zustand/shallow';
import { Toaster } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';

type PropsType = {
	documentId: string;
	data: CommentType | null;
	isEditing: boolean;
	feedbackValue: string;
	setFeedbackValue: React.Dispatch<React.SetStateAction<string>>;
};

const FeedbackForm = ({
	documentId,
	data,
	isEditing,
	feedbackValue,
	setFeedbackValue,
}: PropsType) => {
	const [createFeedback, updateFeedback, isCreatingFeedback] = useDocumentStore(
		useShallow((state) => [
			state.createFeedback,
			state.updateFeedback,
			state.isCreatingFeedback,
		])
	);
	const setIsConfirmEdit = useGeneralStore((state) => state.setIsConfirmEdit);
	const [isConfirm, setIsConfirm] = useState(false);

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!isCreatingFeedback && isConfirm) {
			setIsConfirmEdit(true);
		}
	}, [isConfirm, isCreatingFeedback, setIsConfirmEdit]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isCreatingFeedback) return;
		dialogRef.current?.showModal();
	};

	const handleClickConfirm = () => {
		const dataSend = {
			message: feedbackValue,
		};

		if (isEditing) {
			// Update feedback
			if (!data) return;

			updateFeedback(dataSend, data?.id, documentId);
			setIsConfirm(true);
			return;
		}

		createFeedback(dataSend, documentId);
		setIsConfirm(true);
	};

	return (
		<>
			<Toaster />
			<ConfirmModal
				ref={dialogRef}
				title='Are you sure to post this feedback?'
				events={[handleClickConfirm]}
			/>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit}
			>
				<label className='form-control'>
					<div className='label'>
						<span className='label-text font-bold'>Your feedback</span>
					</div>
					<textarea
						className='textarea textarea-bordered h-24'
						placeholder='Type your feedback here'
						disabled={!isEditing && !!data}
						value={feedbackValue}
						onChange={(e) => setFeedbackValue(e.target.value)}
					></textarea>
				</label>
				<button
					className='btn btn-secondary'
					disabled={!isEditing && !!data}
				>
					{isCreatingFeedback ? (
						<LoaderCircle className='animate-spin' />
					) : (
						'Post feedback'
					)}
				</button>
			</form>
		</>
	);
};

export default FeedbackForm;
