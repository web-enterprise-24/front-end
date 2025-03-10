const BlogItemSkeleton = () => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='rounded-md overflow-hidden skeleton h-[300px] w-full'></div>
			<div className='flex flex-col gap-1'>
				<div className='skeleton h-4 w-full'></div>
				<div className='skeleton h-2 w-2/3'></div>
				<div className='skeleton h-2 w-2/3'></div>
			</div>
			<div className='skeleton h-2 w-1/4'></div>
		</div>
	);
};

export default BlogItemSkeleton;
