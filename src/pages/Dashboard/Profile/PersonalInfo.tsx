import PropsType from "./PropsType";

const PersonalInfo = ({ data }: PropsType) => {
 return (
  <div className="w-full flex flex-col gap-8 p-4 rounded-xl border border-base-300">
   <h2 className="text-md font-bold">Personal Information</h2>
   <div className="flex flex-row gap-10 max-md:flex-col max-md:gap-6">
    <div className="flex flex-col gap-6">
     <div className="flex flex-col gap-2">
      <span className="font-bold text-base-content/70">Full name</span>
      <span className="font-bold">{data?.name}</span>
     </div>
     <div className="flex flex-col gap-2">
      <span className="font-bold text-base-content/70">Email</span>
      <span className="font-bold">{data?.email}</span>
     </div>
     <div className="flex flex-col gap-2">
      <span className="font-bold text-base-content/70">Gender</span>
      <span className="font-bold">{data?.gender}</span>
     </div>
    </div>
    <div className="flex flex-col gap-6">
     <div className="flex flex-col gap-2">
      <span className="font-bold text-base-content/70">Birthday</span>
      <span className="font-bold">
       {data?.dateOfBirth
        ? new Intl.DateTimeFormat("en-US", {
           day: "numeric",
           month: "long",
           year: "numeric",
          }).format(new Date(data.dateOfBirth))
        : ""}
      </span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PersonalInfo;
