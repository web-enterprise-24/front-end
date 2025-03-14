import { useShallow } from 'zustand/shallow';
import { useBlogStore } from '../../store';
import { useEffect } from 'react';
import { BlogItem, BlogItemSkeleton, Overlay } from '../../components';

const PendingBlog = () => {
	const [
		posts,
		getPendingPosts,
		isGettingPosts,
		approveBlog,
		rejectBlog,
		isHandlingBlog,
	] = useBlogStore(
		useShallow((state) => [
			state.posts,
			state.getPendingPosts,
			state.isGettingPosts,
			state.approveBlog,
			state.rejectBlog,
			state.isHandlingBlog,
		])
	);

	useEffect(() => {
		getPendingPosts();
	}, [getPendingPosts]);

	const handleClickApprove = (id: string) => {
		approveBlog(id);
	};

	const handleClickReject = (id: string) => {
		rejectBlog(id);
	};

	return (
		<div className='w-5/6 h-full mx-auto flex flex-col gap-4'>
			{isHandlingBlog && <Overlay isOpenLoader />}
			<div className='w-full flex justify-start items-center'>
				<h1 className='text-lg font-bold '>Pending blogs</h1>
			</div>
			<div
				className={`w-full ${
					isGettingPosts || (posts && posts.length > 0) ? 'grid' : ''
				} grid-cols-2 max-md:grid-cols-1 xl:grid-cols-3 gap-4`}
			>
				{isGettingPosts ? (
					new Array(3).fill(null).map((_, index) => <BlogItemSkeleton key={index} />)
				) : posts && posts.length > 0 ? (
					posts.map((post) => (
						<BlogItem
							page='pending-blog'
							key={post.id}
							data={post}
							isShowActions={true}
							onClickApprove={handleClickApprove}
							onClickReject={handleClickReject}
						/>
					))
				) : (
					<div className='w-full h-[70vh] flex items-center justify-center'>
						<p className='font-bold text-primary-content/40'>No pending blogs now</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PendingBlog;
