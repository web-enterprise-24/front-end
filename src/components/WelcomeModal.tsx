import { BookOpen } from 'lucide-react';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

type PropsType = {
	children?: null;
};

const WelcomeModal = forwardRef(
	(_: PropsType, ref: ForwardedRef<HTMLDialogElement>) => {
		const modalBoxRef = useRef<HTMLDivElement>(null);
		const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
		useEffect(() => {
			if (modalBoxRef.current) {
				setDimensions({
					width: modalBoxRef.current.offsetWidth,
					height: modalBoxRef.current.offsetHeight,
				});
			}

			const handleResize = () => {
				if (modalBoxRef.current) {
					setDimensions({
						width: modalBoxRef.current.offsetWidth,
						height: modalBoxRef.current.offsetHeight,
					});
				}
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);

		const handleClose = () => {
			localStorage.removeItem('firstLogin');
		};

		return (
			<dialog
				ref={ref}
				className='modal'
			>
				<div
					ref={modalBoxRef}
					className='modal-box w-11/12 max-w-3xl'
				>
					<Confetti
						width={dimensions.width}
						height={dimensions.height}
						recycle={true}
						numberOfPieces={100}
						confettiSource={{
							x: dimensions.width / 2,
							y: 0,
							w: 0,
							h: 0,
						}}
					/>
					<BookOpen className='text-secondary size-12 mx-auto' />
					<h2 className='text-center font-black text-xl pt-6'>
						Welcome to University e-Tutoring
					</h2>
					<p className='text-primary-content/60 text-center pt-4'>
						Your gateway to academic success and personalized learning support.
					</p>
					<p className='text-primary-content/70 text-start pt-10'>
						We're excited to have you join our online tutoring platform! Here you can
						connect with qualified tutors, access study materials, and schedule
						sessions to boost your academic performance.
					</p>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<button
								className='btn btn-secondary'
								onClick={handleClose}
							>
								Get Started
							</button>
						</form>
					</div>
				</div>
			</dialog>
		);
	}
);

export default WelcomeModal;
