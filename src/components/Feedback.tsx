import { SquarePen, Trash2 } from 'lucide-react';
import { useAuthStore, useDocumentStore, useGeneralStore } from '../store';
import { useEffect, useRef, useState } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackForm from './FeedbackForm';
import { useShallow } from 'zustand/shallow';
import ConfirmModal from './ConfirmModal';
import Overlay from './Overlay';

const Feedback = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [feedbackValue, setFeedbackValue] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);

	const authUser = useAuthStore((state) => state.authUser);
	const setIsConfirmEdit = useGeneralStore((state) => state.setIsConfirmEdit);
	const [selectedDocument, deleteFeedback, isDeletingFeedback] =
		useDocumentStore(
			useShallow((state) => [
				state.selectedDocument,
				state.deleteFeedback,
				state.isDeletingFeedback,
			])
		);
	const feedback = selectedDocument?.comments[0];

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!isDeletingFeedback && isDeleted) {
			setIsConfirmEdit(true);
			setIsDeleted(false);
		}
	}, [isDeleted, isDeletingFeedback, setIsConfirmEdit]);

	const handleClickEdit = () => {
		setIsEditing(true);
		setFeedbackValue(feedback?.message || '');
	};

	const handleClickDelete = () => {
		dialogRef.current?.showModal();
	};

	const handleClickConfirm = () => {
		if (!feedback) return;
		deleteFeedback(feedback.id, selectedDocument?.id || '');
		setIsDeleted(true);
	};

	return (
		<div className='w-full h-full'>
			{isDeletingFeedback && <Overlay isOpenLoader />}
			<ConfirmModal
				ref={dialogRef}
				title='Are you sure to delete your feedback?'
				events={[handleClickConfirm]}
			/>
			<div
				className={`w-full flex ${
					feedback && authUser?.roles[0]?.code === 'TUTOR'
						? 'justify-between'
						: 'justify-center'
				} items-center pb-2`}
			>
				<h1 className='font-bold text-lg'>Feedback</h1>
				{feedback && authUser?.roles[0]?.code === 'TUTOR' && (
					<div className='flex gap-2'>
						<div
							className='tooltip tooltip-left'
							data-tip='Edit feedback'
						>
							<button
								className='btn btn-ghost'
								onClick={handleClickEdit}
							>
								<SquarePen />
							</button>
						</div>
						<div
							className='tooltip tooltip-left'
							data-tip='Delete feedback'
						>
							<button
								className='btn btn-warning'
								onClick={handleClickDelete}
							>
								<Trash2 />
							</button>
						</div>
					</div>
				)}
			</div>
			<hr />
			<div className='w-full p-4'>
				{feedback ? (
					// Feedback item
					<FeedbackItem data={feedback} />
				) : (
					<p className='text-center font-bold text-primary-content/40'>
						No feedback available
					</p>
				)}
			</div>

			{/* form feedback */}
			{authUser?.roles[0]?.code === 'TUTOR' && (
				<FeedbackForm
					documentId={selectedDocument?.id || ''}
					data={feedback || null}
					isEditing={isEditing}
					feedbackValue={feedbackValue}
					setFeedbackValue={setFeedbackValue}
				/>
			)}
		</div>
	);
};

export default Feedback;
