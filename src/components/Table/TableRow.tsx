import { ManagementActionItems } from '../../constants';
import Dropdown from '../Dropdown';
import { useGeneralStore, useManagementStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import { UserType } from '../../types';
import { convertDate } from '../../utils';
import { EllipsisVertical, UserRoundCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PropsType = {
	data: UserType;
	role: 'STUDENT' | 'TUTOR';
	changeStatus: (userId: string, status: boolean) => void;
	deallocate: (studentId: string) => void;
};

const TableRow = ({ data, role, changeStatus, deallocate }: PropsType) => {
	const [setModalFor, modalElement, setIsShowingModal, getProvinces] =
		useGeneralStore(
			useShallow((state) => [
				state.setModalFor,
				state.modalElement,
				state.setIsShowingModal,
				state.getProvinces,
			])
		);
	const setSelectedUser = useManagementStore((state) => state.setSelectedUser);

	const navigate = useNavigate();

	const handleClickAction = (title?: string) => {
		if (title === 'Edit') {
			modalElement?.showModal();
			setIsShowingModal(true);
			setModalFor('edit-user');
			setSelectedUser(data);
			getProvinces();
		} else if (title === 'Deactivate') {
			changeStatus(data?.id, false);
		} else if (title === 'Deallocate') {
			deallocate(data.id);
		} else if (title === 'Dashboard') {
			navigate(`dashboard/${data.id}`);
		}
	};

	return (
		<tr>
			<td>
				<div className='flex items-center justify-start gap-3'>
					<div className='avatar'>
						<div className='mask mask-squircle h-12 w-12'>
							<img
								src={data?.profilePicUrl?.toString()}
								alt='Avatar'
							/>
						</div>
					</div>
					<div>
						<div className='font-bold truncate'>{data?.name}</div>
						<div className='text-sm opacity-50'>
							{data?.roles[0]?.code.charAt(0) +
								data?.roles[0]?.code.slice(1).toLowerCase()}
						</div>
					</div>
				</div>
			</td>
			<td>{data?.gender}</td>
			<td className='max-w-[100px] truncate'>{data?.email}</td>
			<td className='truncate'>
				{data?.dateOfBirth ? convertDate(data.dateOfBirth) : ''}
			</td>
			<td className='max-w-[100px] truncate'>{data?.address}</td>
			{role === 'STUDENT' && (
				<td>
					{data?.studentAllocations?.[0] ? (
						<div className='flex items-center gap-3'>
							<div className='avatar'>
								<div className='mask mask-squircle h-12 w-12'>
									<img
										src={data?.studentAllocations[0]?.tutor?.profilePicUrl?.toString()}
										alt='Avatar'
									/>
								</div>
							</div>
							<div>
								<div className='font-bold truncate'>
									{data?.studentAllocations[0]?.tutor?.name}
								</div>
								<div className='text-sm opacity-50'>
									{data?.studentAllocations[0]?.tutor?.email}
								</div>
							</div>
						</div>
					) : (
						<span>None</span>
					)}
				</td>
			)}
			<td>
				{data?.status ? (
					<div className='badge badge-primary'>Active</div>
				) : (
					<div className='badge badge-accent'>Inactive</div>
				)}
			</td>
			<td>
				{data?.status ? (
					<Dropdown
						items={ManagementActionItems}
						variant={'management-action'}
						isHidden={role === 'STUDENT' ? !data?.studentAllocations?.[0] : true}
						onClick={handleClickAction}
					>
						<button className='btn btn-ghost btn-xs'>
							<EllipsisVertical />
						</button>
					</Dropdown>
				) : (
					<button
						className='btn btn-neutral btn-sm hover:underline'
						onClick={() => changeStatus(data.id, true)}
					>
						<UserRoundCheck /> Activate
					</button>
				)}
			</td>
		</tr>
	);
};

export default TableRow;
