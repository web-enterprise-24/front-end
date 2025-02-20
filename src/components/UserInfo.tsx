import { useManagementStore } from "../store";

const UserInfo = () => {
 const userCreated = useManagementStore((state) => state.userCreated);

 return (
  <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
   <div className="w-full text-center">
    <h1 className="text-2xl font-bold">User Information</h1>
   </div>
   <div className="avatar">
    <div className="w-24 rounded">
     <img src={userCreated?.profilePicUrl?.toString()} alt="Profile picture" />
    </div>
   </div>
   <div className="w-full flex flex-col gap-2 items-center justify-center p-6">
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3"> Role:</span>
     <span className="font-normal w-2/3 max-md:pl-4">
      {userCreated?.roles[0]?.code}
     </span>
    </div>
    <div className="divider my-1 md:my-2"></div>
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3"> Email:</span>
     <span className="font-normal w-2/3 max-md:pl-4">{userCreated?.email}</span>
    </div>
    <div className="divider my-1 md:my-2"></div>
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3">Date of birth:</span>
     <span className="font-normal w-2/3 max-md:pl-4">
      {new Date(userCreated?.dateOfBirth || Date.now()).toLocaleString(
       "en-US",
       {
        day: "numeric",
        month: "numeric",
        year: "numeric",
       }
      )}
     </span>
    </div>
    <div className="divider my-1 md:my-2"></div>
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3">Gender:</span>
     <span className="font-normal w-2/3 max-md:pl-4">
      {userCreated?.gender}
     </span>
    </div>
    <div className="divider my-1 md:my-2"></div>
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3">Address:</span>
     <span className="font-normal w-2/3 max-md:pl-4">
      {userCreated?.address}
     </span>
    </div>
    <div className="divider my-1 md:my-2"></div>
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3">City:</span>
     <span className="font-normal w-2/3 max-md:pl-4">{userCreated?.city}</span>
    </div>
    <div className="divider my-1 md:my-2"></div>
    <div className="w-full flex truncate font-bold">
     <span className="w-1/3">Country:</span>
     <span className="font-normal w-2/3 max-md:pl-4">
      {userCreated?.country}
     </span>
    </div>
   </div>
  </div>
 );
};

export default UserInfo;
