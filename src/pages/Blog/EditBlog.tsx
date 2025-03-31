import { useEffect, useRef, useState } from 'react';
import { useAuthStore, useBlogStore } from '../../store';
import { BlogSendType } from '../../types';
import { UploadImage } from '../../utils';
import RichTextEditor from './RichTextEditor';
import { useShallow } from 'zustand/shallow';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Overlay } from '../../components';

const EditBlog = () => {
	const authUser = useAuthStore((state) => state.authUser);
	const [
		selectedPost,
		getPost,
		isLoadingPost,
		updateBlog,
		isPostingBlog,
		reset,
	] = useBlogStore(
		useShallow((state) => [
			state.selectedPost,
			state.getPost,
			state.isLoadingPost,
			state.updateBlog,
			state.isPostingBlog,
			state.reset,
		])
	);
	const [data, setData] = useState<BlogSendType>({
		title: selectedPost?.title || '',
		description: selectedPost?.description || '',
		contentRichText: selectedPost?.contentRichText || '',
		tags: selectedPost?.tags || [],
		imgUrl: selectedPost?.imgUrl || '',
	});
	const [isUploading, setIsUploading] = useState(false);
	const [possiblePost, setPossiblePost] = useState(false);

	const fileRef = useRef<HTMLInputElement>(null);

	const { blogId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getPost(blogId || '');

		return () => reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogId, getPost]);

	useEffect(() => {
		if (selectedPost) {
			setData({
				title: selectedPost.title,
				description: selectedPost.description,
				contentRichText: selectedPost.contentRichText,
				tags: selectedPost.tags,
				imgUrl: selectedPost.imgUrl,
			});
			setPossiblePost(true);
		}
	}, [selectedPost]);

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

	const handleUpdateBlog = () => {
		if (!possiblePost) return;
		if (isPostingBlog) return;

		updateBlog(data, blogId || '', () => navigate(`/blog/${blogId}`));
		if (fileRef.current) fileRef.current.value = '';
		setPossiblePost(false);
	};

	if (authUser?.id !== selectedPost?.authorId) {
		return (
			<div className='z-[9999] fixed inset-0 bg-base-100 flex flex-col gap-10 items-center justify-center'>
				<h1 className='font-black text-2xl text-primary-content'>Access Denied</h1>
				<p className='text-md font-bold text-primary-content/80'>
					You are not authorized to access this page.
				</p>
			</div>
		);
	}

	return (
		<>
			{isLoadingPost ? (
				<div className='w-full h-screen flex items-center justify-center'>
					<Loader className='animate-spin' />
				</div>
			) : (
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
										{/* <Camera className='text-primary-content/50' /> */}
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
									onClick={handleUpdateBlog}
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
			)}
		</>
	);
};

export default EditBlog;
