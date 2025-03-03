import { useAuthStore } from "../../../store";

const DetailedDashboard = () => {
 const authUser = useAuthStore((state) => state.authUser);

 return (
  <div className="w-full h-[729px] p-8 bg-base-100">
   <div className="flex flex-col gap-8">
    <h1 className="text-xl font-bold">Main Dashboard</h1>
    {authUser?.roles[0]?.code === "STUDENT" &&
    authUser?.studentAllocations &&
    authUser.studentAllocations[0] ? (
     <div className="w-full h-[500px] flex items-center justify-center">
      <div className="w-1/2 h-full rounded-xl border border-base-200 flex flex-col gap-4 items-center justify-center">
       <h2 className="text-md font-bold">My tutor</h2>
       <div className="flex flex-col gap-2 justify-center items-center">
        <div className="avatar">
         <div className="w-20 rounded-full">
          <img
           src={`${authUser?.studentAllocations?.[0]?.tutor?.profilePicUrl?.toString()}`}
          />
         </div>
        </div>
        <p>{authUser?.studentAllocations?.[0]?.tutor?.name}</p>
        <p>{authUser?.studentAllocations?.[0]?.tutor?.email}</p>
       </div>
      </div>
     </div>
    ) : (
     <div>Nothing</div>
    )}
   </div>
  </div>
 );
};

export default DetailedDashboard;
