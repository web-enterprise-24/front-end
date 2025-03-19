type PropsType = {
	title: string;
	number: number;
};

const StatisticItem = ({ title = '', number = 0 }: PropsType) => {
	return (
		<div className='stats shadow flex-grow'>
			<div className='stat'>
				<div className='stat-title uppercase'>{title}</div>
				<div className='stat-value'>{number}</div>
			</div>
		</div>
	);
};

export default StatisticItem;
