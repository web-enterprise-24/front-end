import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { Toaster } from 'react-hot-toast';

import {
	Home,
	Management,
	Dashboard,
	Message,
	AddNew,
	Profile,
	StudentManagement,
	TutorManagement,
	AllocationManagement,
	DetailedDashboard,
	Document,
	Blog,
	WritingBlog,
	PendingBlog,
	Theme,
	DetailedBlog,
	Meeting,
	StudentDashboard,
	TutorDashboard,
	EditBlog,
	StaffDashboard,
} from './pages';
import { MainLayout, LayoutSidebar } from './layouts';
import { Modal, PageNotFound, WelcomeModal } from './components';
import { useAuthStore, useGeneralStore, useThemeStore } from './store';
import { Loader } from 'lucide-react';
import ChangePasswordForm from './components/ChangePasswordForm';
import { ProtectedRoute } from './components';
import { setRefreshTokenFunction } from './utils/axios';

const App = () => {
	const [isCheckingAuth, checkAuth, authUser, refreshAccessToken, showWelcome] =
		useAuthStore(
			useShallow((state) => [
				state.isCheckingAuth,
				state.checkAuth,
				state.authUser,
				state.refreshAccessToken,
				state.showWelcome,
			])
		);
	const [setModalElement, isShowingModal, isClosingModal, setModalFor] =
		useGeneralStore(
			useShallow((state) => [
				state.setModalElement,
				state.isShowingModal,
				state.isClosingModal,
				state.setModalFor,
			])
		);

	const theme = useThemeStore((state) => state.theme);

	const modalRef = useRef<HTMLDialogElement | null>(null);
	const welcomeModalRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const htmlElement = document.documentElement;
		htmlElement.setAttribute('data-theme', theme);
	}, [theme]);

	useEffect(() => {
		const isWelcome = JSON.parse(localStorage.getItem('firstLogin') || 'false');
		if (isWelcome && showWelcome) {
			if (welcomeModalRef.current) {
				welcomeModalRef.current.showModal();
			}
		}
	}, [showWelcome]);

	useEffect(() => {
		setRefreshTokenFunction(refreshAccessToken);
	}, [refreshAccessToken]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!isClosingModal) {
			setModalFor(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isClosingModal]);

	useEffect(() => {
		if (!isCheckingAuth && modalRef.current) {
			setModalElement(modalRef.current);
		}
	}, [isCheckingAuth, modalRef, setModalElement]);

	if (isCheckingAuth) {
		return (
			<div className='w-screen h-screen flex items-center justify-center'>
				<Loader className='size-30 animate-spin' />
			</div>
		);
	}

	if (authUser?.requiredPasswordChange) {
		return (
			<div className='w-screen h-screen flex flex-col justify-center items-center gap-14 max-md:p-4'>
				<Toaster position='top-center' />
				<div className='size-40'>
					<img
						src='/logo.webp'
						alt='Logo'
					/>
				</div>
				<h1 className='font-bold text-xl'>
					Please change your password at the first access!
				</h1>
				<ChangePasswordForm />
			</div>
		);
	}

	return (
		<div className='font-koh-santepheap'>
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/message'
						element={
							authUser ? (
								<ProtectedRoute>
									<Message />
								</ProtectedRoute>
							) : (
								<Navigate to={'/'} />
							)
						}
					/>
					<Route
						path='/document'
						element={
							authUser ? (
								<ProtectedRoute allowedRoles={['STUDENT', 'TUTOR']}>
									<Document />
								</ProtectedRoute>
							) : (
								<Navigate to={'/'} />
							)
						}
					/>
					<Route
						path='/blog'
						element={<Blog />}
					>
						<Route
							path='write'
							element={authUser ? <WritingBlog /> : <Navigate to={'/'} />}
						/>
						<Route
							path='pending'
							element={
								authUser ? (
									<ProtectedRoute allowedRoles={['STAFF']}>
										<PendingBlog />
									</ProtectedRoute>
								) : (
									<Navigate to={'/'} />
								)
							}
						/>
						<Route
							path=':blogId'
							element={<DetailedBlog />}
						/>
						<Route
							path=':blogId/edit'
							element={authUser ? <EditBlog /> : <Navigate to={'/'} />}
						/>
					</Route>
					<Route
						path='/meeting-schedule'
						element={
							authUser ? (
								<ProtectedRoute allowedRoles={['STUDENT', 'TUTOR']}>
									<Meeting />
								</ProtectedRoute>
							) : (
								<Navigate to={'/'} />
							)
						}
					/>
					<Route
						path='/staff-dashboard/:staffId'
						element={
							authUser ? (
								<ProtectedRoute allowedRoles={['STAFF']}>
									<StaffDashboard />
								</ProtectedRoute>
							) : (
								<Navigate to={'/'} />
							)
						}
					/>
				</Route>
				<Route element={<LayoutSidebar />}>
					<Route
						path='/management'
						element={
							authUser ? (
								<ProtectedRoute allowedRoles={['STAFF']}>
									<Management />
								</ProtectedRoute>
							) : (
								<Navigate to={'/'} />
							)
						}
					>
						<Route
							index
							element={<Navigate to='add-user' />}
						/>
						<Route
							path='add-user'
							element={<AddNew />}
						/>
						<Route
							path='student-management'
							element={<StudentManagement />}
						>
							<Route
								path='dashboard/:studentId'
								element={<StudentDashboard />}
							/>
						</Route>
						<Route
							path='tutor-management'
							element={<TutorManagement />}
						>
							<Route
								path='dashboard/:tutorId'
								element={<TutorDashboard />}
							/>
						</Route>
						<Route
							path='allocation-management'
							element={<AllocationManagement />}
						/>
					</Route>
					<Route
						path='/dashboard'
						element={authUser ? <Dashboard /> : <Navigate to={'/'} />}
					>
						<Route
							index
							element={<Navigate to='profile' />}
						/>
						<Route
							path='profile'
							element={<Profile />}
						/>
						<Route
							path='detailed-dashboard'
							element={<DetailedDashboard />}
						/>
						<Route
							path='themes'
							element={<Theme />}
						/>
					</Route>
				</Route>
				<Route
					path='*'
					element={<PageNotFound />}
				/>
			</Routes>
			<Modal ref={modalRef} />
			<WelcomeModal ref={welcomeModalRef} />
			{!isShowingModal && (
				<Toaster
					position='top-center'
					toastOptions={{
						style: {
							display: isClosingModal ? 'none' : '',
						},
					}}
				/>
			)}
		</div>
	);
};

export default App;
