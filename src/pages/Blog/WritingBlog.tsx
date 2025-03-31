import { useEffect, useRef, useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { Camera } from 'lucide-react';
import { BlogSendType } from '../../types';
import { UploadImage } from '../../utils';
import { Overlay } from '../../components';
import { useBlogStore } from '../../store';
import { useShallow } from 'zustand/shallow';

const WritingBlog = () => {
	const [postBlog, isPostingBlog] = useBlogStore(
		useShallow((state) => [state.postBlog, state.isPostingBlog])
	);
	const [data, setData] = useState<BlogSendType>({
		title: '',
		description: '',
		contentRichText: '',
		tags: [],
		imgUrl: '',
	});

	const [isUploading, setIsUploading] = useState(false);
	const [possiblePost, setPossiblePost] = useState(false);

	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (
			data.title &&
			data.description &&
			data.contentRichText &&
			data.tags.length &&
			data.imgUrl
		) {
			setPossiblePost(true);
		} else {
			setPossiblePost(false);
		}
	}, [data]);

	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		if (field === 'file') {
			const file = e.target.files?.[0];
			if (!file) return;

			const generateImageLink = async () => {
				try {
					setIsUploading(true);
					const result = await UploadImage(file);
					setData({ ...data, imgUrl: result });
				} catch (err) {
					console.log(err);
				} finally {
					setIsUploading(false);
				}
			};

			generateImageLink();
			return;
		}

		if (field === 'tags') {
			const tags = e.target.value.split(',');
			setData((prev) => ({ ...prev, tags }));
			return;
		}

		setData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleChangeDescription = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setData((prev) => ({ ...prev, description: e.target.value }));
	};

	const handleChangeTeEditor = (content: string) => {
		setData((prev) => ({ ...prev, contentRichText: content }));
	};

	const handlePostBlog = () => {
		if (!possiblePost) return;

		postBlog(data);
		setData({
			title: '',
			description: '',
			contentRichText: '',
			tags: [],
			imgUrl: '',
		});
		if (fileRef.current) fileRef.current.value = '';
		setPossiblePost(false);
	};

	return (
		<div className='w-5/6 h-full mx-auto flex flex-col gap-4'>
			{(isUploading || isPostingBlog) && <Overlay isOpenLoader />}
			<div className='w-full flex flex-row max-md:flex-col-reverse justify-between gap-4'>
				<label
					htmlFor='thumbnail'
					className='w-1/3 max-md:w-full mx-auto h-60 bg-base-200 rounded-md cursor-pointer'
				>
					<input
						ref={fileRef}
						type='file'
						id='thumbnail'
						accept='image/*'
						onChange={(e) => handleChangeInput(e, 'file')}
						hidden
					/>
					<div className='w-full h-full flex flex-col items-center justify-center gap-2'>
						{data.imgUrl ? (
							<img
								src={data.imgUrl}
								className='w-full h-full object-cover rounded-md'
								alt='preview thumbnail'
							/>
						) : (
							<>
								<p className='text-sm font-bold text-primary-content/50'>
									Blog thumbnail
								</p>
								<Camera className='text-primary-content/50' />
							</>
						)}
					</div>
				</label>
				<div className='w-2/3 max-md:w-full flex flex-col gap-4'>
					<div className='w-full flex gap-2 items-center'>
						<input
							type='text'
							value={data.title}
							placeholder='Title'
							className='w-full h-14 px-4 rounded-md text-2xl font-bold text-primary-content bg-base-200'
							onChange={(e) => handleChangeInput(e, 'title')}
						/>
						<button
							className='btn btn-secondary'
							disabled={!possiblePost}
							onClick={handlePostBlog}
						>
							Post
						</button>
					</div>
					<textarea
						placeholder='Description'
						value={data.description}
						className='w-full h-24 p-4 rounded-md text-lg text-primary-content bg-base-200'
						onChange={(e) => handleChangeDescription(e)}
					/>
					<input
						type='text'
						placeholder='Tags'
						value={data.tags.join(',')}
						className='w-full h-14 px-4 rounded-md text-lg text-primary-content bg-base-200'
						onChange={(e) => handleChangeInput(e, 'tags')}
					/>
				</div>
			</div>
			<RichTextEditor
				value={data.contentRichText}
				onChange={handleChangeTeEditor}
			/>
		</div>
	);
};

export default WritingBlog;
