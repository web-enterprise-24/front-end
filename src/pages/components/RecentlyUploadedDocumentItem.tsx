import { useAuthStore } from '../../store';
import {
	StudentRecentUploadedDocumentType,
	TutorRecentlyUploadedDocumentType,
} from '../../types';
import { convertDateNotification } from '../../utils';

type PropsType = {
	data:
		| TutorRecentlyUploadedDocumentType
		| StudentRecentUploadedDocumentType
		| null;
};

const RecentlyUploadedDocumentItem = ({ data }: PropsType) => {
	const authUser = useAuthStore((state) => state.authUser);

	// Return early if data is null
	if (!data) {
		return null;
	}

	return (
		<div className='w-full p-2 flex flex-row items-center justify-start gap-4'>
			{authUser?.roles[0]?.code === 'TUTOR' && (
				<div className='avatar'>
					<div className='w-14 rounded-full'>
						<img src={'avatar' in data! ? data?.avatar : '/default-avatar.png'} />
					</div>
				</div>
			)}
			<div className='flex flex-col gap-1'>
				<p className='font-bold line-clamp-2 max-w-[300px] break-words'>
					{'title' in data! ? data.title : data?.fileName}
				</p>
				<p className='text-primary-content/40 text-sm'>
					{authUser?.roles[0]?.code === 'TUTOR' &&
						'name' in data! && <span>{data.name}</span> &&
						' • '}
					<span>{convertDateNotification(data?.uploadedAt || '')}</span>
				</p>
			</div>
		</div>
	);
};

export default RecentlyUploadedDocumentItem;
