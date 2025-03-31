import { Globe, LoaderCircle, MapPinHouse } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

import {
	EmailIconDaisyUI,
	Overlay,
	UserIconDaisyUI,
} from '../../../components';
import './datepicker.css';
import { UserSendType } from '../../../types';
import { useManagementStore, useGeneralStore } from '../../../store';
import { useShallow } from 'zustand/shallow';
import { AxiosError } from 'axios';
import { UploadImage } from '../../../utils';

type PropsType = {
	role: 'STUDENT' | 'TUTOR' | 'STAFF';
};

const AddUserForm = ({ role }: PropsType) => {
	const [modalElement, setIsShowingModal, setModalFor, provinces] =
		useGeneralStore(
			useShallow((state) => [
				state.modalElement,
				state.setIsShowingModal,
				state.setModalFor,
				state.provinces,
			])
		);
	const [isCreatingUser, createUser] = useManagementStore(
		useShallow((state) => [state.isCreatingUser, state.createUser])
	);
	const [userData, setUserData] = useState<UserSendType>({
		role,
		gender: 'Male',
		country: 'Viet Nam',
		dateOfBirth: new Date().toISOString(),
	});
	const [isUploading, setIsUploading] = useState(false);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		setUserData({
			role,
			country: 'Viet Nam',
			gender: 'Male',
			city: '',
			dateOfBirth: new Date().toISOString(),
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [role]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!userData.name) return toast.error('Name is required');
		if (!userData.email) return toast.error('Email is required');
		if (!userData.profilePicUrl) return toast.error('Image is required');
		if (!userData.address) return toast.error('Address is required');
		if (!userData.city) return toast.error('City is required');
		if (!userData.country) return toast.error('Country is required');

		//   Call api
		try {
			await createUser(userData);
			modalElement?.showModal();
			setIsShowingModal(true);
			setModalFor('user-info');
			setUserData({
				role,
				country: 'Viet Nam',
				gender: 'Male',
				city: '',
				dateOfBirth: new Date().toISOString(),
			});
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				toast.error('Sign up failed', err.response?.data?.message);
			}
		}
	};

	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		if (field === 'file') {
			const file = e.target?.files?.[0];
			if (!file) return;
			if (!file.type.includes('image')) {
				if (fileInputRef.current) {
					fileInputRef.current.value = '';
				}
				toast.error('File type is wrong, please uploading image');
				return;
			}

			const generateImageLink = async () => {
				try {
					setIsUploading(true);
					const result = await UploadImage(file);
					setUserData({ ...userData, profilePicUrl: result });
				} catch (err) {
					console.log(err);
				} finally {
					setIsUploading(false);
				}
			};

			generateImageLink();
			return;
		}
		setUserData({ ...userData, [field]: e.target.value });
	};

	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserData({ ...userData, city: e.target.value });
	};

	return (
		<form
			className='w-full flex flex-col gap-4'
			onSubmit={(e) => handleSubmit(e)}
		>
			{isUploading && <Overlay isOpenLoader />}
			<label className='relative block'>
				<UserIconDaisyUI className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70' />
				<input
					type='text'
					className='peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
					placeholder=' '
					autoComplete='on'
					value={userData.name || ''}
					onChange={(e) => handleChangeInput(e, 'name')}
				/>
				<span
					className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
						userData.name ? 'top-0 text-sm' : ''
					}`}
				>
					Full name
				</span>
			</label>
			<div className='flex flex-row items-center gap-4 h-12'>
				<label className='flex flex-row items-center gap-2'>
					<input
						type='radio'
						name='gender'
						value={'Male'}
						className='radio peer'
						autoComplete='off'
						checked={userData.gender.toLowerCase() === 'male'}
						onChange={(e) => handleChangeInput(e, 'gender')}
					/>
					<span className='peer-checked:text-blue-500'>Male</span>
				</label>
				<label className='flex flex-row items-center gap-2'>
					<input
						type='radio'
						name='gender'
						value={'Female'}
						className='radio peer'
						autoComplete='off'
						checked={userData.gender.toLowerCase() === 'female'}
						onChange={(e) => handleChangeInput(e, 'gender')}
					/>
					<span className='peer-checked:text-blue-500'>Female</span>
				</label>
			</div>
			<label className='relative block'>
				<MapPinHouse className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70' />
				<input
					type='text'
					className='peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
					placeholder='Address'
					value={userData.address || ''}
					autoComplete='on'
					onChange={(e) => handleChangeInput(e, 'address')}
				/>
				<span
					className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
						userData.address ? 'top-0 text-sm' : ''
					}`}
				>
					Address
				</span>
			</label>
			<div className='flex flex-col xl:flex-row gap-4 '>
				<label className='relative flex flex-col xl:w-1/2 text-sm '>
					<select
						className='select select-bordered focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
						onChange={(e) => handleChangeSelect(e)}
						value={userData?.city || ''}
					>
						<option value=''>Choose your Province</option>
						{provinces &&
							provinces.map((province, index) => (
								<option key={index}>{province.toString()}</option>
							))}
					</select>
					<span
						className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
							userData?.city ? 'top-0 text-sm' : ''
						}`}
					>
						Province
					</span>
				</label>
				<label className='relative flex-col xl:w-1/2'>
					<label className='input input-bordered flex items-center gap-2  relative'>
						<Globe className='w-4 h-4 text-base-content/70' />
						<input
							type='text'
							className='grow'
							placeholder='Country'
							value={'Viet Nam'}
							autoComplete='on'
							disabled
							//   onChange={(e) => handleChangeInput(e, "country")}
						/>
						<span
							className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
								userData?.country ? 'top-0 text-sm' : ''
							}`}
						>
							Country
						</span>
					</label>
				</label>
			</div>
			<div className='w-full flex flex-col gap-4 relative'>
				<DatePicker
					className='input input-bordered flex items-center gap-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
					selected={new Date(userData.dateOfBirth)}
					onChange={(date) =>
						date && setUserData({ ...userData, dateOfBirth: date.toISOString() })
					}
					popperPlacement='bottom-end'
					placeholderText={'Date of birth'}
					dateFormat={'dd/MM/yyyy'}
				/>
				<span
					className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
						userData.dateOfBirth ? 'top-0 text-sm' : ''
					}`}
				>
					Date of birth
				</span>
			</div>
			<label className='relative block'>
				<EmailIconDaisyUI className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70' />
				<input
					type='email'
					className='peer h-12 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
					placeholder='Email'
					value={userData.email || ''}
					autoComplete='on'
					onChange={(e) => handleChangeInput(e, 'email')}
				/>
				<span
					className={`absolute left-10 top-0 text-sm bg-white px-1 text-gray-500 transition-all duration-200 transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm ${
						userData.email ? 'top-0 text-sm' : ''
					}`}
				>
					Email
				</span>
			</label>
			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className='file-input file-input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
				onChange={(e) => handleChangeInput(e, 'file')}
			/>
			<button className='btn btn-secondary'>
				{isCreatingUser ? <LoaderCircle className='animate-spin' /> : 'Create'}
			</button>
		</form>
	);
};

export default AddUserForm;
