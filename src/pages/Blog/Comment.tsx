import { ThumbsUp } from 'lucide-react';
import CommentForm from './CommentForm';
import { useState } from 'react';
import { CommentType } from '../../types';
import { convertDateNotification } from '../../utils';
import { useParams } from 'react-router-dom';
import { useBlogStore } from '../../store';
import { useShallow } from 'zustand/shallow';
// Get replies in this component broooooooooooooooooooooo
type PropsType = {
	data: CommentType;
};

const Comment = ({ data }: PropsType) => {
	const [updateComment, isHandlingBlog] = useBlogStore(
		useShallow((state) => [state.updateComment, state.isHandlingBlog])
	);
	const [isReply, setIsReply] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const { blogId } = useParams();

	const handleSubmitEdit = (
		e: React.FormEvent<HTMLFormElement>,
		message: string
	) => {
		e.preventDefault();
		if (isHandlingBlog) return;
		updateComment({ message }, blogId || '', data.id);

		if (!isHandlingBlog) {
			setIsEdit(false);
		}
	};

	return (
		<>
			<div className='flex flex-row gap-4 items-center'>
				<div className='avatar self-start'>
					<div className='w-12 rounded-full'>
						<img
							src={data?.user?.profilePicUrl}
							alt='Avatar'
						/>
					</div>
				</div>
				<div>
					<div className='flex flex-row gap-2 items-center'>
						<p className='font-bold text-primary-content'>{data?.user?.name}</p>
						<span className='text-sm text-primary-content'>
							{convertDateNotification(data?.createdAt)}
						</span>
					</div>
					<div className='w-full'>
						{isEdit ? (
							<CommentForm
								isEditForm
								initialValue={data?.message}
								autoFocus
								onSubmit={handleSubmitEdit}
							/>
						) : (
							<p className='text-primary-content'>{data?.message}</p>
						)}
					</div>
					{/* Actions */}
					<div className='flex flex-row gap-2 items-center'>
						<span className='flex gap-2 items-center cursor-pointer text-sm'>
							<ThumbsUp className='size-5' />
							{data?._count?.likes}
						</span>
						<button
							className='btn btn-ghost'
							onClick={() => setIsReply(!isReply)}
						>
							Reply
						</button>
						<button
							className='btn btn-ghost'
							onClick={() => setIsEdit(!isEdit)}
						>
							Edit
						</button>
						<button className='btn btn-ghost'>Delete</button>
					</div>
				</div>
			</div>

			{isReply && <CommentForm />}
		</>
	);
};

export default Comment;
