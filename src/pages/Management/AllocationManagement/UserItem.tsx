import { UserType } from "../../../types";

type PropsType = {
 data: UserType;
 selected: boolean;
 onClick: (user: UserType) => void;
};

const UserItem = ({ data, selected, onClick }: PropsType) => {
 return (
  <div
   className={`flex items-center gap-3 my-1 cursor-pointer hover:bg-base-200 rounded-lg p-2 ${
    selected ? "bg-base-200" : "bg-base-100"
   }`}
   onClick={() => onClick(data)}
  >
   <div className="avatar">
    <div className="mask mask-squircle h-12 w-12">
     <img src={data.profilePicUrl?.toString()} alt="Avatar" />
    </div>
   </div>
   <div>
    <div className="font-bold">{data?.name}</div>
    <div className="text-sm opacity-50">{data?.email}</div>
   </div>
  </div>
 );
};

export default UserItem;
