import Address from './Address';
import Header from './Header';
import PersonalInfo from './PersonalInfo';

import { useAuthStore } from '../../../store';
import { useGeneralStore } from '../../../store';
import { useEffect } from 'react';

const Profile = () => {
	const authUser = useAuthStore((state) => state.authUser);
	const pageAccumulator = useGeneralStore((state) => state.pageAccumulator);

	useEffect(() => {
		pageAccumulator('profile');
	}, [pageAccumulator]);

	return (
		<div className='w-full h-full p-8 bg-base-100'>
			<div className='flex flex-col gap-8'>
				<h1 className='text-xl font-bold'>My Profile</h1>
				<Header data={authUser} />
				<PersonalInfo data={authUser} />
				<Address data={authUser} />
			</div>
		</div>
	);
};

export default Profile;
