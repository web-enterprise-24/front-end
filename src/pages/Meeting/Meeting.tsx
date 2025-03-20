import Calendar from './Calendar';

const Meeting = () => {
	return (
		<div className='w-3/4 mx-auto min-h-full py-6'>
			<div className='w-full h-full flex flex-row gap-6'>
				<Calendar />
			</div>
		</div>
	);
};

export default Meeting;
