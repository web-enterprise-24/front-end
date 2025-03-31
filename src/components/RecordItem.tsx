import { Download, Trash } from 'lucide-react';
import { RecordType } from '../types';
import { convertDate, convertTime } from '../utils';
import { useAuthStore, useMeetingStore } from '../store';
import { useShallow } from 'zustand/shallow';
import { useRef } from 'react';
import Overlay from './Overlay';
import ConfirmModal from './ConfirmModal';

type PropsType = {
	data: RecordType;
};

const RecordItem = ({ data }: PropsType) => {
	const authUser = useAuthStore((state) => state.authUser);
	const [deleteRecord, isDeletingRecord] = useMeetingStore(
		useShallow((state) => [state.deleteRecord, state.isDeletingRecord])
	);

	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleDownload = (fileUrl: string) => {
		const downloadLink = document.createElement('a');
		downloadLink.href = fileUrl;
		downloadLink.click();
	};

	// handle delete record
	const handleClickDelete = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleConfirmDelete = () => {
		deleteRecord(data.id);
	};

	return (
		<div className='w-full p-2 flex flex-row items-center justify-between border border-primary-content/10 rounded-lg'>
			{isDeletingRecord && <Overlay isOpenLoader />}
			<ConfirmModal
				ref={dialogRef}
				title='Are you sure you want to delete this record?'
				events={[handleConfirmDelete]}
			/>
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
					<button
						className='btn btn-error btn-sm'
						onClick={handleClickDelete}
					>
						<Trash />
					</button>
				)}
			</div>
		</div>
	);
};

export default RecordItem;
