import { ReactNode, useRef } from 'react';

import { DropdownItemsType } from '../types';
import { Link } from 'react-router-dom';

type Props = {
	children: ReactNode;
	items: DropdownItemsType[];
	variant: 'user' | 'management-action' | 'notification';
	isHidden?: boolean;
	onClick?: (
		title?: string,
		listRef?: React.RefObject<HTMLUListElement | null>
	) => void;
};

const Dropdown = ({
	children,
	items,
	variant,
	isHidden,
	onClick = () => {},
}: Props) => {
	const ulRef = useRef<HTMLUListElement | null>(null);

	if (['user', 'management-action', 'notification'].includes(variant)) {
		if (variant === 'management-action' && isHidden) {
			items = items.slice(0, 2);
		}

		let dropdown = '';
		if (variant === 'notification') {
			dropdown = 'dropdown-left';
		} else if (variant === 'management-action' || variant === 'user') {
			dropdown = 'dropdown-end';
		}
		return (
			<div
				className={`dropdown ${dropdown} ${
					variant === 'notification' && 'dropdown-left'
				} `}
			>
				{children}
				<ul
					ref={ulRef}
					tabIndex={0}
					className='dropdown-content menu bg-base-100 rounded-box z-[9999] w-52 p-2 shadow-xl font-bold'
				>
					{items &&
						items.map((item) => {
							let Component: React.ElementType | string = 'a';
							const prop: { to?: string } = {};
							if ('icon' in item && item.to) {
								Component = Link;
								prop.to = item.to;
							}

							return (
								<li
									key={item.id}
									onClick={() => onClick(item.title, ulRef)}
								>
									<Component {...prop}>
										{'icon' in item && <item.icon />}
										{item.title}
									</Component>
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
};

export default Dropdown;
