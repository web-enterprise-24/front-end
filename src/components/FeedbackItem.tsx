import { CommentType } from '../types';
import { convertDate } from '../utils';

type PropsType = {
	data: CommentType;
};

const FeedbackItem = ({ data }: PropsType) => {
	return (
		<div className='flex flex-row gap-4 bg-base-200/30 p-3 rounded-lg'>
			<div>
				<div className='avatar'>
					<div className='w-16 rounded-full'>
						<img
							src={data?.user?.profilePicUrl}
							alt='Avatar'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-6 justify-center'>
				<p className='text-primary-content'>{data?.message}</p>
				<div className='flex flex-row justify-between items-center'>
					<div className='flex flex-col gap-1'>
						<p className='font-bold'>{data?.user?.name}</p>
						<p className='font-bold text-primary-content/40'>{data?.user?.email}</p>
					</div>
					<div className='self-start'>
						<p className='text-primary-content'>
							{convertDate(data?.createdAt || '')}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeedbackItem;
