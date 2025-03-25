import {
	ChartNoAxesColumnIncreasing,
	Unplug,
	UserRoundMinus,
	UserRoundPen,
} from 'lucide-react';

import { DropdownItemsType } from '../types';

const items: DropdownItemsType[] = [
	{
		id: 1,
		title: 'Dashboard',
		icon: ChartNoAxesColumnIncreasing,
	},
	{
		id: 2,
		title: 'Edit',
		icon: UserRoundPen,
	},
	{
		id: 3,
		title: 'Deactivate',
		icon: UserRoundMinus,
	},
	{
		id: 4,
		title: 'Deallocate',
		icon: Unplug,
	},
];

export default items;
