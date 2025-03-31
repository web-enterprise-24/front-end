import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

import {
	UserType,
	UserLoginType,
	ChangePasswordFirstTimeType,
	UserSendType,
} from '../types';
import {
	changePasswordFirstTime,
	editProfile,
	getCurrentUser,
	login,
	logout,
} from '../services';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { setRefreshTokenFunction } from '../utils/axios';

type AuthStoreType = {
	accessToken: string | null;
	refreshToken: string | null;
	isCheckingAuth: boolean;
	isLoggingIn: boolean;
	isChangingPassword: boolean;
	isChangingProfile: boolean;
	authUser: UserType | null;
	lastLogin: string | null;
	showWelcome: boolean;
	socket: Socket | null;
	loginUser: (data: UserLoginType) => void;
	logoutUser: () => void;
	checkAuth: () => void;
	requireChangePassword: (data: ChangePasswordFirstTimeType) => void;
	changeProfile: (data: UserSendType, userId: string) => void;
	connectSocket: () => void;
	disconnectSocket: () => void;
	refreshAccessToken: () => Promise<string>;
};

// Get data from localStorage
const accessToken = localStorage.getItem('access');
const savedrefreshToken = localStorage.getItem('refresh');

// New refresh token service
export const refreshToken = async (
	refreshToken: string,
	accessToken: string
) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_BASE_URL}token/refresh`,
			{ refreshToken },
			{
				// Skip interceptor for this request to avoid loops
				headers: {
					skipAuthRefresh: 'true',
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
					'x-api-key': import.meta.env.VITE_X_API_KEY,
				},
			}
		);
		return res;
	} catch (err) {
		if (err instanceof AxiosError) throw err;
	}
};

const useAuthStore = create<AuthStoreType>((set, get) => ({
	accessToken: accessToken || null,
	refreshToken: savedrefreshToken || null,
	authUser: null,
	lastLogin: null,
	showWelcome: false,
	socket: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isLoggingIn: false,
	isChangingPassword: false,
	isChangingProfile: false,

	async refreshAccessToken() {
		const currentRefreshToken = get().refreshToken;
		const currentAccessToken = get().accessToken;

		if (!currentRefreshToken) {
			throw new Error('No refresh token available');
		}

		try {
			const res = await refreshToken(
				currentRefreshToken,
				currentAccessToken || ''
			);
			if (!res) {
				throw new Error('Failed to refresh token');
			}

			// Update tokens in store
			set({
				accessToken: res.data.accessToken,
				refreshToken: res.data.refreshToken,
			});

			// Update localStorage
			localStorage.setItem('access', res.data.accessToken);
			if (res.data.refreshToken) {
				localStorage.setItem('refresh', res.data.refreshToken);
			}

			return res.data.accessToken;
		} catch (err) {
			// If refresh fails, log the user out silently
			set({
				authUser: null,
				accessToken: null,
				refreshToken: null,
			});
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');

			throw err;
		}
	},

	async checkAuth() {
		try {
			const res = await getCurrentUser();
			set({ authUser: res, lastLogin: res.lastLoginMessage });
			set({ showWelcome: true });
			get().connectSocket();
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response?.data?.message);
				// console.log(err);
			}
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	async loginUser(data) {
		try {
			set({ isLoggingIn: true });
			const res = await login(data);

			set({
				accessToken: res.tokens.accessToken,
				refreshToken: res.tokens.refreshToken,
			});

			get().connectSocket();
			localStorage.setItem('access', res.tokens.accessToken);
			localStorage.setItem('refresh', res.tokens.refreshToken);
			// Safely check if loginMessage exists before using it
			const isFirstLogin =
				res.loginMessage &&
				typeof res.loginMessage === 'string' &&
				res.loginMessage.toLowerCase().includes('welcome');

			localStorage.setItem('firstLogin', JSON.stringify(!!isFirstLogin));

			toast.success('Logged in successfully');
			setTimeout(() => window.location.reload(), 1500);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Log in failed: ${err.response?.data?.message}`);
			}
			set({
				authUser: null,
				accessToken: null,
				refreshToken: null,
			});
		} finally {
			set({ isLoggingIn: false });
		}
	},
	logoutUser() {
		try {
			logout();
			get().disconnectSocket();
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			toast.success('Logged out successfully');
			setTimeout(() => window.location.reload(), 1500);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Log out failed: ${err.response?.data?.message}`);
			}
		}
	},
	async requireChangePassword(data) {
		try {
			set({ isChangingPassword: true });
			await changePasswordFirstTime(data, accessToken);
			localStorage.removeItem('access');
			toast.success('Password has been changed successfully');
			setTimeout(() => {
				window.location.href = '/';
			}, 1500);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Change password failed: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isChangingPassword: false });
		}
	},
	async changeProfile(data: UserSendType, userId: string) {
		try {
			set({ isChangingProfile: true });
			const res = await editProfile(data, userId);
			set({ authUser: res });
			toast.success('Profile has been changed successfully');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error(`Change profile failed: ${err.response?.data?.message}`);
			}
		} finally {
			set({ isChangingProfile: false });
		}
	},
	connectSocket() {
		if (!get().authUser || get().socket?.connected) return;

		const socket = io(import.meta.env.VITE_BASE_URL, {
			query: {
				userId: get().authUser?.id,
			},
		});
		socket.connect();

		set({ socket });
	},
	disconnectSocket() {
		const { socket } = get();

		if (socket) {
			if (socket.connected) socket.disconnect();
		}
	},
}));

// Connect refreshAccessToken function to the axios instance
// This completes the circular reference safely
setRefreshTokenFunction(useAuthStore.getState().refreshAccessToken);

export default useAuthStore;
