import { Link, useLocation } from 'react-router-dom';
import { SidebarType } from '../types';
import { useEffect, useState } from 'react';
import {
	ArrowLeftToLine,
	SquareChevronLeft,
	SquareChevronRight,
} from 'lucide-react';
import { useManagementStore } from '../store';
import { useShallow } from 'zustand/shallow';

type Props = {
	items: SidebarType[];
};

const SidebarFixed = ({ items }: Props) => {
	const [reset, setAllocation] = useManagementStore(
		useShallow((state) => [state.reset, state.setAllocation])
	);

	const location = useLocation();
	const pathname = location.pathname;
	const page = pathname.includes('management') ? 'management' : 'dashboard';
	const [sidebarItemActive, setSideBarItemActive] = useState(
		page === 'management' ? 'add-user' : 'profile'
	);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		if (page === 'management') {
			setSideBarItemActive(location.pathname.slice(12));
			return;
		}
		setSideBarItemActive(location.pathname.slice(11));
	}, [location.pathname, page]);
	console.log(sidebarItemActive);
	return (
		<div className='flex'>
			<div
				className={`${
					isSidebarOpen ? 'w-72' : 'w-20'
				} bg-base h-full hidden xl:flex flex-col justify-between py-16 px-4 shadow-lg shadow-base-300 duration-300 relative`}
			>
				<button
					className='absolute top-4 right-4'
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					{isSidebarOpen ? (
						<SquareChevronLeft className='w-6 h-6  ' />
					) : (
						<SquareChevronRight className='w-6 h-6 ' />
					)}
				</button>
				<ul className='w-full flex flex-col gap-6'>
					{items &&
						items.map((item) => (
							<li
								key={item.id}
								className={`bg-base-200 rounded-lg border-3 p-0 btn ${
									sidebarItemActive === item.to && 'border-2 btn btn-outline'
								}`}
								onClick={() => {
									setSideBarItemActive(item.to);
									if (page === 'management') {
										reset();
										if (item.title === 'Allocation') {
											setAllocation('unallocated');
										} else if (
											item.title === 'Student Management' ||
											item.title === 'Tutor Management'
										) {
											setAllocation('');
										}
									}
								}}
							>
								<Link
									to={item.to}
									className='flex flex-row items-center justify-center gap-3 text-sm font-normal w-full h-full p-3'
								>
									<item.icon className='w-6 h-6 ' />
									<span
										className={`${!isSidebarOpen && 'hidden'} origin-left duration-200`}
									>
										{item.title}
									</span>
								</Link>
							</li>
						))}
				</ul>
				<Link
					to={'/'}
					className='btn btn-outline '
				>
					<ArrowLeftToLine className='' />
					<span className={`${!isSidebarOpen && 'hidden'} origin-left duration-200`}>
						Back to home
					</span>
				</Link>
			</div>
		</div>
	);
};

export default SidebarFixed;
