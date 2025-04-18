import { ThumbsUp } from 'lucide-react';
import CommentForm from './CommentForm';
import { useRef, useState } from 'react';
import { CommentType } from '../../types';
import { convertDateNotification, transformRole } from '../../utils';
import { useParams } from 'react-router-dom';
import { useAuthStore, useBlogStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import ConfirmModal from '../../components/ConfirmModal';
// Get replies in this component broooooooooooooooooooooo
type PropsType = {
	data: CommentType;
};

const Comment = ({ data }: PropsType) => {
	const authUser = useAuthStore((state) => state.authUser);
	const [updateComment, deleteComment, isHandlingBlog] = useBlogStore(
		useShallow((state) => [
			state.updateComment,
			state.deleteComment,
			state.isHandlingBlog,
		])
	);
	// const [isReply, setIsReply] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const dialogRef = useRef<HTMLDialogElement | null>(null);

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

	const handleClickDelete = () => {
		dialogRef.current?.showModal();
	};

	const handleConfirmDelete = () => {
		deleteComment(blogId || '', data.id);
	};

	return (
		<>
			<div className='w-full flex flex-row gap-4'>
				<ConfirmModal
					ref={dialogRef}
					title='Are you sure you want to delete this comment?'
					events={[handleConfirmDelete]}
				/>
				<div className='avatar self-start'>
					<div className='w-12 rounded-full'>
						<img
							src={data?.user?.profilePicUrl}
							alt='Avatar'
						/>
					</div>
				</div>
				<div className='w-full flex-1 min-w-0'>
					<div className='flex flex-row gap-2 items-center'>
						<p className='font-bold text-primary-content'>{data?.user?.name}</p>
						<p className='text-sm text-primary-content'>
							<span>{convertDateNotification(data?.createdAt)}</span> •{' '}
							<span
								className={`badge ${
									data?.user.roles[0]?.code === 'STAFF'
										? 'badge-accent'
										: data?.user.roles[0]?.code === 'TUTOR'
										? 'badge-secondary'
										: 'badge-primary'
								}`}
							>
								{transformRole(data?.user.roles[0]?.code || '')}
							</span>
						</p>
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
							<p className='text-primary-content break-words whitespace-pre-wrap max-w-full overflow-hidden'>
								{data?.message}
							</p>
						)}
					</div>
					{/* Actions */}
					<div className='flex flex-row gap-2 items-center'>
						<span className='flex gap-2 items-center cursor-pointer text-sm'>
							<ThumbsUp className='size-5' />
							{data?._count?.likes}
						</span>
						{/* <button
							className='btn btn-ghost'
							onClick={() => setIsReply(!isReply)}
						>
							Reply
						</button> */}
						{authUser?.id === data?.user.id && (
							<>
								<button
									className='btn btn-ghost'
									onClick={() => setIsEdit(!isEdit)}
								>
									Edit
								</button>
								<button
									className='btn btn-ghost'
									onClick={handleClickDelete}
								>
									Delete
								</button>
							</>
						)}
					</div>
				</div>
			</div>
			{/* {isReply && <CommentForm />} */}
		</>
	);
};

export default Comment;
