import { CommentType } from '../types';
import { convertDate } from '../utils';

type PropsType = {
	data: CommentType;
};

const FeedbackItem = ({ data }: PropsType) => {
	return (
		<div className='flex flex-row gap-4 bg-base-200/30 p-2 rounded-lg max-w-full'>
			<div className='shrink-0'>
				<div className='avatar'>
					<div className='w-16 rounded-full ring-1 ring-primary-content/20'>
						<img
							src={data?.user?.profilePicUrl}
							alt='Avatar'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-6 justify-center w-full overflow-hidden'>
				<div className='max-h-36 overflow-y-auto custom-scrollbar pr-1'>
					<p className='break-words whitespace-pre-wrap text-base overflow-x-hidden'>
						{data?.message || 'No feedback message available'}
					</p>
				</div>
				<div className='flex flex-row max-md:flex-col max-md:items-end max-md:gap-6 justify-between items-center'>
					<div className='flex flex-col gap-1 max-md:gap-0'>
						<p className='font-bold truncate'>{data?.user?.name}</p>
						<p className='font-bold text-primary-content/40 max-md:text-sm truncate'>
							{data?.user?.email}
						</p>
					</div>
					<div className='self-start max-md:self-end'>
						<p className='text-primary-content/40 font-bold text-sm'>
							{convertDate(data?.createdAt || '')}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeedbackItem;
