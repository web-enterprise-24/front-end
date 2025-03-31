import { useShallow } from 'zustand/shallow';
import { useAuthStore, useBlogStore } from '../../store';
import { convertDate, transformRole } from '../../utils';
import CommentForm from './CommentForm';
import CommentLists from './CommentLists';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { EllipsisVertical, Loader } from 'lucide-react';
import Dropdown from '../../components/Dropdown';
import { DetailedBlogDropdownItems } from '../../constants';
import ConfirmModal from '../../components/ConfirmModal';
import { Overlay } from '../../components';

const DetailedBlog = () => {
	const [
		selectedPost,
		getPost,
		postComment,
		isHandlingComment,
		isLoadingPost,
		deleteBlog,
		isHandlingBlog,
	] = useBlogStore(
		useShallow((state) => [
			state.selectedPost,
			state.getPost,
			state.postComment,
			state.isHandlingComment,
			state.isLoadingPost,
			state.deleteBlog,
			state.isHandlingBlog,
		])
	);
	const authUser = useAuthStore((state) => state.authUser);

	const dialogRef = useRef<HTMLDialogElement>(null);

	const { blogId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (blogId) {
			getPost(blogId);
		}
	}, [getPost, blogId]);

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		message: string
	) => {
		e.preventDefault();
		if (isHandlingComment) return;
		postComment({ message }, blogId || '');
	};

	const handleClickAction = (title?: string) => {
		if (title === 'Edit') {
			// Handle edit action
			console.log('Edit action clicked');
		} else if (title === 'Delete') {
			if (dialogRef.current) {
				dialogRef.current.showModal();
			}
		}
	};

	const handleConfirmDelete = () => {
		if (blogId) {
			deleteBlog(blogId, () => navigate('/blog'));
		}
	};

	return (
		<div className='w-1/2 max-xl:w-5/6 min-h-screen mx-auto flex flex-col'>
			{isLoadingPost ? (
				<div className='w-full h-screen flex items-center justify-center'>
					<Loader className='animate-spin' />
				</div>
			) : (
				<>
					<div className='flex-grow'>
						<ConfirmModal
							ref={dialogRef}
							title='Are you sure you want to delete this blog?'
							events={[handleConfirmDelete]}
						/>
						{isHandlingBlog && <Overlay isOpenLoader />}
						<div className='w-full flex flex-col gap-2'>
							{/* Blog title */}
							<h1 className='font-black text-2xl text-primary-content'>
								{selectedPost?.title}
							</h1>
							{/* Created date */}
							<p className='text-primary-content text-xs font-bold'>
								{convertDate(selectedPost?.createdAt || new Date().toString())}
							</p>
							{/* Tag */}
							<div className='flex flex-row gap-2 flex-wrap'>
								{selectedPost?.tags.map((tag) => (
									<span
										key={tag}
										className='p-2 rounded-full bg-base-200 text-primary-content text-xs font-bold'
									>
										{tag}
									</span>
								))}
							</div>
							{/* Author */}
							<div className='flex flex-row items-center justify-between'>
								<div className='flex flex-row gap-2 items-center'>
									<div className='avatar'>
										<div className='w-12 rounded-full'>
											<img
												src={selectedPost?.author?.profilePicUrl}
												alt='Avatar'
											/>
										</div>
									</div>
									<div className='flex flex-col gap-0'>
										<p className='font-bold text-primary-content'>
											{selectedPost?.author?.name}
										</p>
										<p className='font-bold text-primary-content/40 text-sm'>
											<span>Author</span> •{' '}
											<span>
												{transformRole(selectedPost?.author?.roles[0]?.code || '')}
											</span>
										</p>
									</div>
								</div>
								{authUser?.id === selectedPost?.authorId && (
									<Dropdown
										items={DetailedBlogDropdownItems}
										variant='user'
										onClick={handleClickAction}
									>
										<button className='btn btn-ghost btn-xs'>
											<EllipsisVertical />
										</button>
									</Dropdown>
								)}
							</div>
						</div>
						{/* Blog content */}
						{/* Description */}
						<div className='w-full p-4 bg-base-200 mt-10 rounded-md'>
							<p className='text-primary-content italic'>
								{selectedPost?.description}
							</p>
						</div>
						{/* Rich text */}
						<div
							className='w-full mt-10'
							dangerouslySetInnerHTML={{ __html: selectedPost?.contentRichText || '' }}
						></div>
					</div>

					{/* Comment section - always at the bottom */}
					<div className='mt-8 pb-8 w-full'>
						<hr className='mb-4' />
						<h3 className='font-bold text-xl mb-4'>Comments</h3>

						{/* Comment form */}
						<div className='w-full mb-6'>
							<CommentForm onSubmit={handleSubmit} />
						</div>

						{/* Comments list */}
						<CommentLists />
					</div>
				</>
			)}
		</div>
	);
};

export default DetailedBlog;
