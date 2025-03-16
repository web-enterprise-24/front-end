import { Eye } from 'lucide-react';
import { BlogType } from '../types';
import { convertDate } from '../utils';
import { Link } from 'react-router-dom';

type PropsType = {
	page: 'home' | 'pending-blog' | 'blog';
	data: BlogType;
	isShowActions?: boolean;
	onClickApprove?: (id: string) => void;
	onClickReject?: (id: string) => void;
	onClickBlog?: (id: string) => void;
};

const BlogItem = ({
	page,
	data,
	isShowActions = false,
	onClickApprove,
	onClickReject,
	onClickBlog,
}: PropsType) => {
	let Comp = 'div' as React.ElementType;
	if (page === 'home' || page === 'blog') {
		Comp = Link;
	} else if (page === 'pending-blog') {
		Comp = 'div';
	}

	return (
		<Comp
			to={`/blog/${data.id}`}
			className='flex flex-col gap-2'
			onClick={() => onClickBlog && onClickBlog(data.id)}
		>
			<div className='rounded-md overflow-hidden relative pb-[56.25%]'>
				<img
					className='absolute inset-0 w-full h-full object-cover'
					// https://c4.wallpaperflare.com/wallpaper/446/815/587/landscape-wallpaper-preview.jpg
					src={data?.imgUrl}
					alt='Blog'
				/>
			</div>
			<div className='flex flex-col gap-1'>
				<h1 className='text-xl text-primary-content font-bold line-clamp-2'>
					{data?.title}
				</h1>
				<p className='text-sm text-primary-content/40 line-clamp-2'>
					{data?.description}
				</p>
			</div>
			<div>
				<p className='text-primary-content/40 text-sm'>
					<span>{data?.author?.name}</span> •{' '}
					<span>{convertDate(data?.createdAt)}</span>
				</p>
			</div>
			{isShowActions && (
				<div className='flex gap-2 justify-between items-center'>
					<Link
						to={`/blog/${data.id}`}
						className='btn btn-ghost'
					>
						<Eye />
					</Link>
					<div className='flex gap-2'>
						<button
							className='btn btn-secondary'
							onClick={() => onClickApprove && onClickApprove(data.id)}
						>
							Approve
						</button>
						<button
							className='btn btn-accent'
							onClick={() => onClickReject && onClickReject(data.id)}
						>
							Reject
						</button>
					</div>
				</div>
			)}
		</Comp>
	);
};

export default BlogItem;
