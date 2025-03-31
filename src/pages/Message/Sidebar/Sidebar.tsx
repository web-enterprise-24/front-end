import { useShallow } from 'zustand/shallow';
import {
	autoUpdate,
	flip,
	offset,
	shift,
	size,
	useFloating,
} from '@floating-ui/react';

import { useMessageStore } from '../../../store';
import { UserType } from '../../../types';
import SkeletonUserChat from './SkeletonUserChat';
import UserItem from './UserItem';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks';
import { Loader } from 'lucide-react';
import { SearchIconDaisyUI } from '../../../components';

const Sidebar = () => {
	const [
		setSelectedUser,
		selectedUser, // Add selectedUser to the store destructuring
		users,
		isUserLoading,
		searchUsers,
		searchUserResult,
		isSearchingUser,
		addUserToList,
	] = useMessageStore(
		useShallow((state) => [
			state.setSelectedUser,
			state.selectedUser, // Add this
			state.users,
			state.isUserLoading,
			state.searchUsers,
			state.searchUserResult,
			state.isSearchingUser,
			state.addUserToList,
		])
	);

	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	const debounceValue = useDebounce(searchText, 1500);

	useEffect(() => {
		if (searchText.trim() !== '') {
			searchUsers(debounceValue);
			setIsOpen(true);
		} else if (searchText.trim() === '') {
			setIsOpen(false);
		}
	}, [debounceValue, searchUsers]);

	const handleClick = (user: UserType) => {
		setSelectedUser(user);
	};

	const handleClickSearchUser = (user: UserType) => {
		setSelectedUser(user);
		addUserToList(user);
	};

	const { refs, floatingStyles } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: 'bottom-start',
		middleware: [
			offset(8),
			flip({ padding: 10 }),
			shift({ padding: 10 }),
			size({
				apply({ rects, elements, availableHeight }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
						maxHeight: `${Math.min(400, availableHeight)}px`,
					});
				},
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	return (
		<div className='w-1/4 max-xl:w-full rounded-lg p-4 border-2 border-base-200 flex flex-col gap-6 bg-gray-100 overflow-hidden'>
			<h2 className='text-xl font-bold'>Message</h2>
			<label
				ref={refs.setReference}
				className='input input-bordered input-md flex items-center gap-2 min-h-12 rounded-full '
			>
				<input
					type='text'
					className='grow'
					value={searchText}
					placeholder='Search by name or email'
					autoComplete='off'
					onChange={(e) => setSearchText(e.target.value)}
					onFocus={() => {
						if (debounceValue) {
							setIsOpen(true);
						}
					}}
					onBlur={() =>
						setTimeout(() => {
							setIsOpen(false);
						}, 200)
					}
				/>
				<SearchIconDaisyUI />
			</label>

			{isOpen && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					className='bg-gray-100 shadow-2xl rounded-lg p-3 border border-base-300 z-50 max-h-[400px] overflow-x-hidden overflow-y-auto scrollbar-hide'
				>
					{isSearchingUser ? (
						<span className='animate-spin flex justify-center'>
							<Loader />
						</span>
					) : searchUserResult ? (
						searchUserResult.map((user) => (
							<UserItem
								key={user.id}
								data={user}
								onClick={() => handleClickSearchUser(user)}
								isSelected={selectedUser?.id === user.id} // Pass selected state
							/>
						))
					) : (
						<div className='font-bold text-sm text-primary-content/50 text-center'>
							There is no matching user
						</div>
					)}
				</div>
			)}
			<div className='w-full overflow-x-hidden overflow-y-auto flex flex-col gap-2'>
				{isUserLoading
					? new Array(8)
							.fill(null)
							.map((item, index) => <SkeletonUserChat key={index + item} />)
					: users.map((user) => (
							<UserItem
								key={user.id}
								data={user}
								onClick={handleClick}
								isSelected={selectedUser?.id === user.id}
							/>
					  ))}
			</div>
		</div>
	);
};

export default Sidebar;
