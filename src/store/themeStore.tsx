import { create } from 'zustand';

type ThemeStoreType = {
	theme: string;
	setTheme: (theme: string) => void;
};

const useThemeStore = create<ThemeStoreType>((set) => ({
	theme: localStorage.getItem('chat-theme') || 'emerald',
	setTheme: (theme) => {
		localStorage.setItem('chat-theme', theme);
		set({ theme });
	},
}));

export default useThemeStore;
