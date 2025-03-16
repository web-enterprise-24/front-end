import { useShallow } from 'zustand/shallow';

import { THEMES } from '../../../constants';
import { useThemeStore } from '../../../store';

const Theme = () => {
	const [theme, setTheme] = useThemeStore(
		useShallow((state) => [state.theme, state.setTheme])
	);

	return (
		<div className='w-full min-h-[calc(100vh-64px-4px)]'>
			<div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2'>
				{THEMES.map((t) => (
					<button
						key={t}
						className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? 'bg-base-200' : 'hover:bg-base-200/50'}
              `}
						onClick={() => setTheme(t)}
					>
						<div
							className='relative h-8 w-full rounded-md overflow-hidden'
							data-theme={t}
						>
							<div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
								<div className='rounded bg-primary'></div>
								<div className='rounded bg-secondary'></div>
								<div className='rounded bg-accent'></div>
								<div className='rounded bg-neutral'></div>
							</div>
						</div>
						<span className='text-[11px] font-medium truncate w-full text-center'>
							{t.charAt(0).toUpperCase() + t.slice(1)}
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default Theme;
