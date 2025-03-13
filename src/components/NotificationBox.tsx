import {
	autoUpdate,
	flip,
	offset,
	shift,
	size,
	useFloating,
	useInteractions,
	useDismiss,
	useRole,
} from '@floating-ui/react';
import { Check } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useNotificationStore } from '../store';
import { useShallow } from 'zustand/shallow';

type PropsType = {
	children?: ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	triggerRef: React.RefObject<HTMLElement | HTMLDivElement | null>;
};

const NotificationBox = ({
	children,
	isOpen,
	setIsOpen,
	triggerRef,
}: PropsType) => {
	const [notifications, markAsReadAll] = useNotificationStore(
		useShallow((state) => [state.notifications, state.markAsReadAll])
	);

	// State to track screen width
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// Update windowWidth when resized
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Calculate width based on screen size
	const getFloatingWidth = () => {
		if (windowWidth <= 480) return '95vw'; // Extra small screens
		if (windowWidth <= 768) return '350px'; // Small screens
		return '400px'; // Medium and larger screens
	};

	// Floating UI
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: 'bottom-end',
		middleware: [
			offset(8),
			flip({ padding: 8 }),
			shift({ padding: 8 }),
			size({
				apply({ elements, availableHeight }) {
					Object.assign(elements.floating.style, {
						width: getFloatingWidth(),
						maxHeight: `${Math.min(400, availableHeight)}px`,
					});
				},
			}),
		],
		whileElementsMounted: autoUpdate,
		elements: {
			reference: triggerRef?.current || null,
		},
	});

	// Set up interactions (including click outside to dismiss)
	const dismiss = useDismiss(context);
	const role = useRole(context);

	// Merge all interactions
	const { getFloatingProps } = useInteractions([dismiss, role]);

	if (!isOpen) return null;

	return (
		<div
			ref={refs.setFloating}
			style={floatingStyles}
			{...getFloatingProps()}
			className='min-h-24 max-h-[400px] w-[200px] bg-base-100 rounded-lg p-4 z-[50] shadow-2xl overflow-x-hidden overflow-y-hidden scrollbar-hide flex flex-col gap-4'
		>
			{/* header */}
			<div className='flex justify-between items-center'>
				<h3 className='font-bold text-lg'>Notifications</h3>
				{notifications && notifications.length > 0 && (
					<button
						className='btn btn-ghost font-bold'
						onClick={() => {
							{
								if (notifications && notifications.some((n) => !n.isRead)) {
									markAsReadAll();
								}
							}
						}}
					>
						<Check className='size-4' />
						Mark all as read
					</button>
				)}
			</div>
			{/* notification item */}
			{children}
		</div>
	);
};

export default NotificationBox;
