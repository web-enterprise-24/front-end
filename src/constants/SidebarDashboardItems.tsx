import {
	ChartNoAxesColumnIncreasing,
	Palette,
	UserRoundPen,
} from 'lucide-react';
import { SidebarType } from '../types';

const items: SidebarType[] = [
	{
		id: 1,
		title: 'Profile',
		to: 'profile',
		icon: UserRoundPen,
	},
	{
		id: 2,
		title: 'Dashboard',
		to: 'detailed-dashboard',
		icon: ChartNoAxesColumnIncreasing,
	},
	{
		id: 3,
		title: 'Themes',
		to: 'themes',
		icon: Palette,
	},
];

export default items;
