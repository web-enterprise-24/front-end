import CountUp from 'react-countup';

type PropsType = {
	title: string;
	number: number;
};

const StatisticItem = ({ title = '', number = 0 }: PropsType) => {
	return (
		<div className='stats shadow flex-grow'>
			<div className='stat'>
				<div className='stat-title uppercase'>{title}</div>
				<CountUp
					start={0}
					end={number}
					delay={2}
				>
					{({ countUpRef }) => (
						<div
							ref={countUpRef as React.Ref<HTMLDivElement>}
							className='stat-value'
						>
							{number}
						</div>
					)}
				</CountUp>
			</div>
		</div>
	);
};

export default StatisticItem;
