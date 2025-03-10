import { Eye } from 'lucide-react';
import { BlogType } from '../types';
import { convertDate } from '../utils';

type PropsType = {
	data: BlogType;
	isShowActions?: boolean;
};

const BlogItem = ({ data, isShowActions = false }: PropsType) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='rounded-md overflow-hidden'>
				<img
					className='w-full object-cover'
					src='https://c4.wallpaperflare.com/wallpaper/446/815/587/landscape-wallpaper-preview.jpg'
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
					<button className='btn btn-ghost'>
						<Eye />
					</button>
					<div className='flex gap-2'>
						<button className='btn btn-secondary'>Approve</button>
						<button className='btn btn-accent'>Reject</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default BlogItem;
