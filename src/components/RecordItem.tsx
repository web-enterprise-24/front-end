import { Download, Trash } from 'lucide-react';
import { RecordType } from '../types';
import { convertDate, convertTime } from '../utils';
import { useAuthStore } from '../store';

type PropsType = {
	data: RecordType;
};

const RecordItem = ({ data }: PropsType) => {
	const authUser = useAuthStore((state) => state.authUser);

	const handleDownload = (fileUrl: string) => {
		const downloadLink = document.createElement('a');
		downloadLink.href = fileUrl;
		downloadLink.click();
	};

	return (
		<div className='w-full p-2 flex flex-row items-center justify-between border border-primary-content/10 rounded-lg'>
			<div className='flex flex-col gap-2 items-start justify-start'>
				<p className='truncate max-md:max-w-[200px] md:max-w-[300px]'>
					ID: {data?.id}
				</p>
				<p>
					<span>{convertDate(data.createdAt)}</span>{' '}
					<span>{convertTime(data.createdAt)}</span>
				</p>
			</div>
			<div className='self-end flex flex-row gap-2'>
				<button className='btn btn-secondary btn-sm '>
					<Download onClick={() => handleDownload(data.fileUrl)} />
				</button>
				{authUser?.roles[0]?.code === 'TUTOR' && (
					<button className='btn btn-error btn-sm'>
						<Trash />
					</button>
				)}
			</div>
		</div>
	);
};

export default RecordItem;
