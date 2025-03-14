import { useShallow } from 'zustand/shallow';
import { useBlogStore } from '../../store';
import { convertDate } from '../../utils';
import CommentForm from './CommentForm';
import CommentLists from './CommentLists';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const DetailedBlog = () => {
	const [selectedPost, getPost, postComment, isHandlingComment] = useBlogStore(
		useShallow((state) => [
			state.selectedPost,
			state.getPost,
			state.postComment,
			state.isHandlingComment,
		])
	);

	const { blogId } = useParams();

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

	return (
		<div className='w-1/2 min-h-screen mx-auto flex flex-col'>
			<div className='flex-grow'>
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
					<div className='flex flex-row gap-2'>
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
							<span className='font-bold text-primary-content/40 text-sm'>Author</span>
						</div>
					</div>
				</div>
				{/* Blog content */}
				{/* Description */}
				<div className='w-full p-4 bg-base-200 mt-10 rounded-md'>
					<p className='text-primary-content italic'>{selectedPost?.description}</p>
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
		</div>
	);
};

export default DetailedBlog;
