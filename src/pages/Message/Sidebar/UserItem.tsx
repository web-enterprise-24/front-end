import { UserType } from "../../../types";

type PropsType = {
 data: UserType;
 onClick: (user: UserType) => void;
};

const UserItem = ({ data, onClick }: PropsType) => {
 return (
  <div
   className="flex flex-row gap-2 hover:bg-base-200 rounded-2xl cursor-pointer p-2 transition-colors ease-linear duration-200"
   onClick={() => onClick(data)}
  >
   <div className="avatar">
    <div className="w-16 rounded-full">
     <img src={data?.profilePicUrl?.toString()} />
    </div>
   </div>
   <div className="flex flex-col gap-1">
    <p className="text-primary-content font-bold">{data?.name}</p>
    <p className="text-primary-content/50 font-bold truncate max-w-[250px]">
     {data?.email}
    </p>
   </div>
  </div>
 );
};

export default UserItem;
