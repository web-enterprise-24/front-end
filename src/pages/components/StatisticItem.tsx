import { CalendarCheck, CalendarSync, FileStack, FileText, MessageCircle, Users, UsersRound } from 'lucide-react';
import CountUp from 'react-countup';

type PropsType = {
	title: string;
	number: number;
	color?: string;
};

const StatisticItem = ({ title = '', number = 0, color }: PropsType) => {

	const renderIcon = () => {
		switch (title.toLowerCase()) {
			case 'tutors':
				return <UsersRound className={`w-16 h-16 ${color}`} />;
			case 'students':
				return <Users className={`w-16 h-16 ${color}`} />;
			case 'messages':
				return <MessageCircle className={`w-16 h-16 ${color}`} />;
			case 'completed meeting':
				return <CalendarCheck className={`w-16 h-16 ${color}`} />;
			case'documents': 
				  return <FileText className={`w-16 h-16 ${color}`} />; 
			case'total tutees':
				return <Users className={`w-16 h-16 ${color}`} />;
			case 'upcoming meetings':
				return <CalendarSync className={`w-16 h-16 ${color}`} />;
			case 'documents needing feedback':
				return <FileStack className={`w-16 h-16 ${color}`} />;
			default:
				return null;
			}
	  };

	return (
		<div className={`stats shadow flex-grow flex items-center border-l-4 ${color} pl-4`}>
			<div className='stat'>
			<div className='stat-figure'>{renderIcon()}</div>
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
