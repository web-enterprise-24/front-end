import { TutorRecentlyUploadedDocumentType } from '../../types';
import { convertDateNotification } from '../../utils';

type PropsType = {
	data: TutorRecentlyUploadedDocumentType | null;
};

const RecentlyUploadedDocumentItem = ({ data }: PropsType) => {
	return (
		<div className='w-full p-2 flex flex-row items-center justify-start gap-4'>
			<div className='avatar'>
				<div className='w-14 rounded-full'>
					<img src={data?.avatar} />
				</div>
			</div>
			<div className='flex flex-col gap-1'>
				<p className='font-bold'>{data?.title}</p>
				<p className='text-primary-content/40 text-sm'>
					<span>{data?.name}</span> •{' '}
					<span>{convertDateNotification(data?.uploadedAt || '')}</span>
				</p>
			</div>
		</div>
	);
};

export default RecentlyUploadedDocumentItem;
