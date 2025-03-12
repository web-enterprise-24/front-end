import { UserType } from "../../../types";

type PropsType = {
  data: UserType;
  onClick: (user: UserType) => void;
  isSelected?: boolean; // Add isSelected prop
};

const UserItem = ({ data, onClick, isSelected }: PropsType) => {
  return (
    <div className="">
      <div
        className={`flex flex-row gap-2 rounded-2xl cursor-pointer p-2 transition-colors ease-linear duration-200 ${
          isSelected 
            ? "bg-base-300" // Selected state styles
            : "hover:bg-base-200" // Default/hover state
        }`}
        onClick={() => onClick(data)}
      >
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img alt=""src={data?.profilePicUrl?.toString()} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-primary-content font-bold">
            {data?.name}
          </p>
          <p
            className="text-primary-content/50 font-bold truncate max-w-[250px]"
          >
            {data?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;