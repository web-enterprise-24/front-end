import { LoaderCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useBlogStore } from '../../store';

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
	const isHandlingComment = useBlogStore((state) => state.isHandlingComment);
	const [message, setMessage] = useState(initialValue || '');

	return (
		<form
			onSubmit={(e) => onSubmit && onSubmit(e, message)}
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
				disabled={isHandlingComment}
			>
				{isHandlingComment ? <LoaderCircle className='animate-spin' /> : <Send />}
			</button>
		</form>
	);
};

export default CommentForm;
