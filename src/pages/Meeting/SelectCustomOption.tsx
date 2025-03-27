import {
	components,
	GroupBase,
	OptionProps as ReactSelectOptionProps,
} from 'react-select';
import { TutorTuteesInformationType } from '../../types';

type CustomOptionType = {
	value: string;
	label: string;
	tutee: TutorTuteesInformationType;
};

const SelectCustomOption = (
	props: ReactSelectOptionProps<
		CustomOptionType,
		false,
		GroupBase<CustomOptionType>
	>
) => {
	return (
		<components.Option {...props}>
			<div className='flex flex-row gap-2 items-center'>
				<div className='avatar'>
					<div className='size-10 rounded-full'>
						<img
							src={props.data.tutee.avatar}
							alt='Avatar'
						/>
					</div>
				</div>
				<div className='flex flex-col gap-1'>
					<p className='font-bold'>{props.data.tutee.name}</p>
					<p className='font-bold text-sm text-primary-content/80'>
						{props.data.tutee.email}
					</p>
				</div>
			</div>
		</components.Option>
	);
};

export default SelectCustomOption;
