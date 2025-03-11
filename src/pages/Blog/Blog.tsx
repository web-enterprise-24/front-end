import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { SquarePen } from 'lucide-react';
import { useAuthStore, useBlogStore, useGeneralStore } from '../../store';
import { BlogItem, BlogItemSkeleton } from '../../components';

const Blog = () => {
	const authUser = useAuthStore((state) => state.authUser);
	const [modalElement, setIsShowingModal, setModalFor] = useGeneralStore(
		useShallow((state) => [
			state.modalElement,
			state.setIsShowingModal,
			state.setModalFor,
		])
	);

	const [posts, getLatestPosts, isGettingPosts] = useBlogStore(
		useShallow((state) => [
			state.posts,
			state.getLatestPosts,
			state.isGettingPosts,
		])
	);

	const location = useLocation();
	const isMainBlogPage = location.pathname === '/blog';

	useEffect(() => {
		if (isMainBlogPage) {
			getLatestPosts();
		}
	}, [getLatestPosts, isMainBlogPage]);

	const handleClickLogin = () => {
		modalElement?.showModal();
		setIsShowingModal(true);
		setModalFor('login');
	};

	let NavComp = 'div' as React.ElementType;
	if (authUser) {
		NavComp = Link;
	}

	return (
		<div className='w-full min-h-full my-6'>
			<Outlet />
			{isMainBlogPage && (
				<div className='w-5/6 h-full mx-auto flex flex-col gap-4'>
					<div className='w-full flex justify-between items-center'>
						<h1 className='font-bold text-lg'>All blogs</h1>
						<div className='flex items-center gap-2'>
							{authUser && authUser?.roles[0]?.code === 'STAFF' && (
								<Link
									to={'pending'}
									className='btn btn-secondary'
								>
									Pending blogs
								</Link>
							)}
							<div
								className='tooltip'
								data-tip='Write a blog'
							>
								<NavComp
									to={'write'}
									className='btn btn-ghost'
									onClick={() => {
										if (!authUser) {
											handleClickLogin();
										}
									}}
								>
									<SquarePen />
								</NavComp>
							</div>
						</div>
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
			)}
		</div>
	);
};

export default Blog;
