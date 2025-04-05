import { forwardRef, ForwardedRef, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import LoginForm from './LoginForm';
import { useAuthStore, useGeneralStore, useManagementStore } from '../store';
import { useShallow } from 'zustand/shallow';
import UserInfo from './UserInfo';
import EditUserForm from './EditUserForm';
import { LoaderCircle } from 'lucide-react';
import Feedback from './Feedback';
import RecordLists from './RecordLists';

type PropsType = {
	children?: null;
};

const Modal = forwardRef(
	(_: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
		const [
			setIsShowingModal,
			setIsClosingModal,
			isShowingModal,
			modalFor,
			setShowConfirm,
			setIsConfirmEdit,
			isConfirmEdit,
		] = useGeneralStore(
			useShallow((state) => [
				state.setIsShowingModal,
				state.setIsClosingModal,
				state.isShowingModal,
				state.modalFor,
				state.setShowConfirm,
				state.setIsConfirmEdit,
				state.isConfirmEdit,
			])
		);
		const isChangingProfile = useAuthStore((state) => state.isChangingProfile);
		const [isEditing] = useManagementStore(
			useShallow((state) => [state.isEditing, state.setSelectedUser])
		);

		const closeRef = useRef<HTMLButtonElement | null>(null);
		const closeRefModalNoButton = useRef<HTMLButtonElement | null>(null);

		useEffect(() => {
			if (isConfirmEdit && modalFor === 'feedback') {
				if (closeRefModalNoButton.current) {
					closeRefModalNoButton.current.click();
				}
			}
		}, [isConfirmEdit, modalFor]);

		useEffect(() => {
			if (isConfirmEdit) {
				// For edit profile
				if (!isChangingProfile) {
					if (closeRef.current) {
						closeRef.current.click();
					}

					//  For edit user in staff
					if (!isEditing) {
						if (closeRef.current) {
							closeRef.current.click();
						}
					}
				}
			}
		}, [isConfirmEdit, isChangingProfile, isEditing, modalFor]);
		return (
			<dialog
				ref={ref}
				className='modal modal-lg'
			>
				<div
					className={`modal-box ${
						modalFor === 'login'
							? 'hero-content flex-col lg:flex-row w-lg max-w-4xl h-[70vh]'
							: ''
					}`}
				>
					{modalFor === 'login' && (
						<>
							<div className='text-center lg:text-left'>
								<Toaster position='top-center' />
								<div className='flex flex-col items-center gap-3'>
									<h1 className='text-2xl font-black bold'>Log in</h1>
									<p className='y-6'>
										Enter your details to get sign in to your account
									</p>
								</div>
							</div>
							<div className='card bg-base-50 w-full max-w-lg shrink-0 shadow-2xl'>
								{isShowingModal && <LoginForm />}
							</div>
						</>
					)}
					{modalFor === 'feedback' && (
						<>
							<Toaster position='top-center' />
							<div className='w-full max-h-[70vh] overflow-hidden'>
								<Feedback />
							</div>
						</>
					)}
					{modalFor === 'show-record' && <RecordLists />}
					{['user-info', 'edit-user', 'edit-profile'].includes(modalFor || '') && (
						<>
							{modalFor === 'user-info' && <UserInfo />}
							{['edit-user', 'edit-profile'].includes(modalFor || '') && (
								<EditUserForm formFor={modalFor as 'edit-user' | 'edit-profile'} />
							)}
							<div className='modal-action'>
								{['edit-user', 'edit-profile'].includes(modalFor || '') && (
									<button
										className='btn btn-secondary'
										onClick={() => {
											setShowConfirm(true);
										}}
									>
										{isChangingProfile || isEditing ? (
											<LoaderCircle className='animate-spin' />
										) : (
											'Save'
										)}
									</button>
								)}
								<form method='dialog'>
									{/* if there is a button in form, it will close the modal */}
									<button
										ref={closeRef}
										className='btn'
										onClick={() => {
											setIsShowingModal(false);
											setIsClosingModal();
											setIsConfirmEdit(false);
										}}
									>
										Close
									</button>
								</form>
							</div>
						</>
					)}
				</div>
				{['login', 'feedback', 'show-record'].includes(modalFor || '') && (
					<form
						method='dialog'
						className='modal-backdrop'
					>
						<button
							ref={closeRefModalNoButton}
							onClick={() => {
								setIsShowingModal(false);
								setIsClosingModal();
								setIsConfirmEdit(false);
							}}
						>
							close
						</button>
					</form>
				)}
			</dialog>
		);
	}
);

export default Modal;
