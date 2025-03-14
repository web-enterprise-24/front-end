import { LoaderCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore, useBlogStore, useGeneralStore } from '../../store';
import { useShallow } from 'zustand/shallow';

type PropsType = {
	autoFocus?: boolean;
	isEditForm?: boolean;
	initialValue?: string;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>, message: string) => void;
};

const CommentForm = ({
	isEditForm,
	initialValue,
	autoFocus,
	onSubmit,
}: PropsType) => {
	const authUser = useAuthStore((state) => state.authUser);
	const [modalElement, setIsShowingModal, setModalFor] = useGeneralStore(
		useShallow((state) => [
			state.modalElement,
			state.setIsShowingModal,
			state.setModalFor,
		])
	);
	const isHandlingComment = useBlogStore((state) => state.isHandlingComment);
	const [message, setMessage] = useState(initialValue || '');
	const [prevIsHandlingComment, setPrevIsHandlingComment] = useState(false);

	useEffect(() => {
		// If we were handling a comment and now we're not, it means submission completed
		if (prevIsHandlingComment && !isHandlingComment) {
			setMessage('');
		}
		// Update the previous state for next comparison
		setPrevIsHandlingComment(isHandlingComment);
	}, [isHandlingComment, prevIsHandlingComment]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check auth
		if (!authUser) {
			modalElement?.showModal();
			setIsShowingModal(true);
			setModalFor('login');
			return;
		}

		if (onSubmit) {
			onSubmit(e, message);
		}
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			className={`flex flex-row gap-2 items-center ${isEditForm && 'w-[897px]'}`}
		>
			<textarea
				autoFocus={autoFocus}
				value={message}
				className='textarea textarea-bordered w-full'
				placeholder='Add your comment...'
				rows={1}
				onChange={(e) => setMessage(e.target.value)}
			></textarea>
			<button
				className='btn btn-secondary self-end'
				disabled={message === '' || isHandlingComment}
			>
				{isHandlingComment ? <LoaderCircle className='animate-spin' /> : <Send />}
			</button>
		</form>
	);
};

export default CommentForm;
