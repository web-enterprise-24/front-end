type PropsType = {
	data: {
		title?: string;
		month: string;
		day: string;
		hour: string;
	};
};

const UpcomingMeeting = ({ data }: PropsType) => {
	return (
		<div className='p-2 flex flex-row items-center justify-between'>
			<div className='flex flex-row items-center gap-4'>
				<div className='flex flex-col justify-center items-center size-16 border border-primary-content/50 rounded-lg bg-base-200'>
					<p className='text-primary-content/70 text-xs'>{data?.month}</p>
					<p className='text-primary-content font-bold text-lg'>{data?.day}</p>
				</div>
				<div className='flex flex-col gap-1'>
					<p className='font-bold'>{data?.title}</p>
					<p className='font-bold'>{data?.hour}</p>
					<p className='text-primary-content/40 text-sm'>Virtual</p>
				</div>
			</div>
		</div>
	);
};

export default UpcomingMeeting;
