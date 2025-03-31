import { Download, FileText, MessageSquareMore, Trash } from 'lucide-react';
import { StudentDocumentType, TutorDocumentType } from '../../types';
import { convertDate } from '../../utils';
import { useDocumentStore, useGeneralStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import { useRef } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import { Overlay } from '../../components';

type PropsType = {
	role: 'TUTOR' | 'STUDENT' | '';
	data: StudentDocumentType | TutorDocumentType;
};

const FileItem = ({ data, role }: PropsType) => {
	const [modalElement, setModalFor, setIsShowingModal] = useGeneralStore(
		useShallow((state) => [
			state.modalElement,
			state.setModalFor,
			state.setIsShowingModal,
		])
	);
	const [deleteDocument, isDeletingDocument, setSelectedDocument] =
		useDocumentStore(
			useShallow((state) => [
				state.deleteDocument,
				state.isDeletingDocument,
				state.setSelectedDocument,
			])
		);

	const dialogRef = useRef<HTMLDialogElement>(null);

	let fileType;
	if (data?.fileType === 'application/pdf') {
		fileType = 'PDF';
	} else if (
		[
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		].includes(data?.fileType)
	) {
		fileType = 'Word';
	}

	const handleDownload = async (fileUrl: string, fileType: string) => {
		try {
			if (!fileUrl) {
				console.error('File URL is missing');
				return;
			}

			// For PDF files specifically, we might need to fetch the file first
			if (fileType === 'application/pdf') {
				// Fetch the file as blob
				const response = await fetch(fileUrl);
				const blob = await response.blob();

				// Create object URL from blob
				const objectURL = URL.createObjectURL(blob);

				// Create and use download link
				const link = document.createElement('a');
				link.href = objectURL;
				link.download = data.fileName || 'document.pdf';
				document.body.appendChild(link);
				link.click();

				// Clean up
				document.body.removeChild(link);
				URL.revokeObjectURL(objectURL);
			} else {
				// For non-PDF files, use direct approach
				const link = document.createElement('a');
				link.href = fileUrl;
				link.download = data.fileName || 'document';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};

	const handleClickComment = () => {
		modalElement?.showModal();
		setIsShowingModal(true);
		setModalFor('feedback');

		setSelectedDocument(data.id);
	};

	const handleClickDelete = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleConfirmDelete = () => {
		deleteDocument(data.id);
	};

	return (
		<div className='w-full h-60 max-h-60 border rounded-2xl overflow-hidden border-primary-content/40 hover:-translate-y-1 transition-transform ease-linear duration-150'>
			<ConfirmModal
				ref={dialogRef}
				title='Are you sure you want to delete this document?'
				events={[handleConfirmDelete]}
			/>
			{isDeletingDocument && <Overlay isOpenLoader />}
			<div className='w-full h-1/2 flex items-center justify-center bg-neutral-content'>
				<FileText className='size-10 text-secondary' />
			</div>
			<div className='h-1/2 flex flex-col justify-center gap-2 border-t border-primary-content/40 p-4'>
				<div className='w-full flex flex-col items-start justify-center'>
					<p className='font-bold text-lg truncate w-full'>{data?.fileName}</p>
					<p className='text-sm text-primary-content/70'>
						<span
							className={`badge ${
								fileType === 'PDF' ? ' badge-accent' : ' badge-secondary'
							}`}
						>
							{fileType}
						</span>{' '}
						• <span>{`${(data?.fileSize / 1048576).toFixed(1)} MB`}</span> •{' '}
						<span>{convertDate(data?.createdAt)}</span>
					</p>
					{role === 'TUTOR' && 'student' in data && (
						<p className='text-md text-primary-content/90'>
							{(data as TutorDocumentType).student?.name}
						</p>
					)}
				</div>
				<div className='w-full flex flex-row items-center justify-end gap-10'>
					{role === 'STUDENT' && (
						<span
							className='cursor-pointer'
							onClick={handleClickDelete}
						>
							<Trash />
						</span>
					)}
					<span
						className='text-primary-content cursor-pointer'
						onClick={handleClickComment}
					>
						<MessageSquareMore />
					</span>
					<span
						className='text-primary-content cursor-pointer'
						onClick={() => handleDownload(data?.fileUrl, data?.fileType)}
					>
						<Download />
					</span>
				</div>
			</div>
		</div>
	);
};

export default FileItem;
