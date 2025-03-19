import { EllipsisVertical } from 'lucide-react';
import { NotificationDropdownItems } from '../constants';
import Dropdown from './Dropdown';
import { NotificationType } from '../types';
import { convertDateNotification } from '../utils';
import { useNotificationStore } from '../store';
import { useShallow } from 'zustand/shallow';
import { Link } from 'react-router-dom';

type PropsType = {
	data: NotificationType;
	notificationBoxHeaderRef?: React.RefObject<HTMLHeadingElement | null>;
	closeNotification?: () => void;
};

const NotificationItem = ({ data, closeNotification }: PropsType) => {
	const [markAsReadOne, deleteOne] = useNotificationStore(
		useShallow((state) => [state.markAsReadOne, state.deleteOne])
	);

	const onClick = (
		title?: string,
		ulRef?: React.RefObject<HTMLUListElement | null>
	) => {
		if (title === 'Mark as reads') {
			if (data.status === 'unread') {
				markAsReadOne(data.id);
			}
		} else if (title === 'Delete') {
			deleteOne(data.id);
		}

		// close the dropdown
		if (ulRef) {
			ulRef.current?.blur();
		}
	};

	let path = '';
	if (data.type === 'document_submission' || data.type === 'feedback') {
		path = '/document';
	}

	return (
		<div className='w-full flex flex-row items-center gap-1'>
			<Link
				to={path}
				className='w-full flex flex-row items-center gap-2 hover:bg-base-200 rounded-lg p-2 cursor-pointer'
				onClick={() => {
					markAsReadOne(data.id);
					if (closeNotification) closeNotification();
				}}
			>
				<div className='avatar'>
					<div className='w-14 rounded-full'>
						<img
							src={data?.userInfo?.userAvatar}
							alt='Avatar'
						/>
					</div>
				</div>
				<div className='flex flex-col gap-1'>
					<p
						className={`${
							data.status === 'unread' && 'font-bold'
						} max-w-[240px] line-clamp-2`}
					>
						<span className='font-black'>{data.userInfo?.userName}</span>{' '}
						{data.message.slice(data.message.indexOf('has'), data.message.length)}
					</p>
					<p className='text-sm text-primary-content/60'>
						{convertDateNotification(data.timestamp)}
					</p>
				</div>
			</Link>

			{/* actions */}
			<Dropdown
				items={NotificationDropdownItems}
				variant={'notification'}
				onClick={onClick}
			>
				<span
					tabIndex={0}
					className='size-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-base-200 p-2'
				>
					<EllipsisVertical className='size-full' />
				</span>
			</Dropdown>
		</div>
	);
};

export default NotificationItem;
