import { useShallow } from 'zustand/shallow';
import { useBlogStore } from '../../store';
import { useEffect } from 'react';
import { BlogItem, BlogItemSkeleton } from '../../components';

const PendingBlog = () => {
	const [posts, getPendingPosts, isGettingPosts] = useBlogStore(
		useShallow((state) => [
			state.posts,
			state.getPendingPosts,
			state.isGettingPosts,
		])
	);

	useEffect(() => {
		getPendingPosts();
	}, [getPendingPosts]);

	return (
		<div className='w-5/6 h-full mx-auto flex flex-col gap-4'>
			<div className='w-full flex justify-start items-center'>
				<h1 className='text-lg font-bold '>Pending blogs</h1>
			</div>
			<div className='w-full grid grid-cols-2 max-md:grid-cols-1 xl:grid-cols-3 gap-4'>
				{isGettingPosts
					? new Array(3)
							.fill(null)
							.map((_, index) => <BlogItemSkeleton key={index} />)
					: posts &&
					  posts.map((post) => (
							<BlogItem
								key={post.id}
								data={post}
								isShowActions={true}
							/>
					  ))}
			</div>
		</div>
	);
};

export default PendingBlog;
