import { components, GroupBase, SingleValueProps } from 'react-select';
import { TutorTuteesInformationType } from '../../types';

type CustomOptionType = {
	value: string;
	label: string;
	tutee: TutorTuteesInformationType;
};

const SelectCustomSingleValue = (
	props: SingleValueProps<CustomOptionType, false, GroupBase<CustomOptionType>>
) => {
	return (
		<components.SingleValue {...props}>
			<div className='flex flex-row gap-2 items-center'>
				<div className='avatar'>
					<div className='w-8 rounded-full'>
						<img
							src={props.data.tutee.avatar}
							alt='Avatar'
						/>
					</div>
				</div>
				<span>{props.data.tutee.name}</span>
			</div>
		</components.SingleValue>
	);
};

export default SelectCustomSingleValue;
