import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { UserLoginType } from '../types';
import { useAuthStore } from '../store';
import { useShallow } from 'zustand/shallow';

const LoginForm = () => {
	const [loginUser, isLoggingIn] = useAuthStore(
		useShallow((state) => [state.loginUser, state.isLoggingIn])
	);
	const [userData, setUserData] = useState<UserLoginType>({});
	const [showPassword, setShowPassword] = useState(false);

	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		setUserData({ ...userData, [field]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!userData.email) return toast.error('Email is required');
		if (!userData.password) return toast.error('Password is required');

		//   Call api
		loginUser(userData);
	};

	return (
		<>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className='card-body'
			>
				{/* Email Input */}
				<div className='relative'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
						fill='currentColor'
						className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70'
					>
						<path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
						<path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
					</svg>
					<input
						type='email'
						className='peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
						value={userData.email || ''}
						placeholder=' '
						autoComplete='on'
						autoFocus
						onChange={(e) => handleChangeInput(e, 'email')}
					/>
					<label
						className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
							userData.email ? 'top-0 text-sm' : ''
						}`}
					>
						Email
					</label>
				</div>

				{/* Password Input */}
				<div className='relative mt-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
						fill='currentColor'
						className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70'
					>
						<path
							fillRule='evenodd'
							d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
							clipRule='evenodd'
						/>
					</svg>
					<input
						type={showPassword ? 'text' : 'password'}
						className='peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
						placeholder=' '
						autoComplete='off'
						onChange={(e) => handleChangeInput(e, 'password')}
						value={userData.password || ''}
					/>
					<label
						className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
							userData.password ? 'top-0 text-sm' : ''
						}`}
					>
						Password
					</label>
					<div className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'>
						{!showPassword ? (
							<EyeClosed
								onClick={() => setShowPassword(!showPassword)}
								className='h-5 w-5 text-gray-500 hover:text-gray-700'
							/>
						) : (
							<Eye
								onClick={() => setShowPassword(!showPassword)}
								className='h-5 w-5 text-gray-500 hover:text-gray-700'
							/>
						)}
					</div>
				</div>

				<p className='text-sm font-normal italic mt-2 cursor-pointer select-none'>
					Forgot your password?
				</p>
				<button className='btn btn-secondary mt-4'>
					{isLoggingIn ? <LoaderCircle className='animate-spin' /> : 'Log in'}
				</button>
			</form>
		</>
	);
};

export default LoginForm;
