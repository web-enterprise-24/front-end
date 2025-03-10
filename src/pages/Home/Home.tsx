import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBlogStore } from '../../store';
import { BlogItem, BlogItemSkeleton } from '../../components';

const Home = () => {
	const [posts, getLatestPosts, isGettingPosts] = useBlogStore(
		useShallow((state) => [
			state.posts,
			state.getLatestPosts,
			state.isGettingPosts,
		])
	);

	useEffect(() => {
		getLatestPosts();
	}, [getLatestPosts]);

	return (
		<div className='w-full min-h-full mb-6'>
			<div className='w-full mx-auto max-h-96 h-96 bg-gradient-to-r from-secondary/30 to-secondary flex items-center justify-center mb-6 p-4'>
				<div className='text-center'>
					<h1 className='text-base-100 font-black text-2xl'>
						Welcome to University E-Tutoring Platform
					</h1>
					<p className='text-base-100'>
						Access course materials, connect with tutors, and enhance your learning
						experience with our exclusive resources.
					</p>
				</div>
			</div>
			<div className='w-5/6 h-full mx-auto flex flex-col gap-4'>
				<div className='w-full flex justify-between items-center'>
					<h2 className='font-bold text-lg'>Latest blogs</h2>
					<button className='btn btn-ghost'>See more</button>
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
								/>
						  ))}
				</div>
			</div>
		</div>
	);
};

export default Home;
