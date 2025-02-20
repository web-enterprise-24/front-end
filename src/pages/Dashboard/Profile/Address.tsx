import PropsType from "./PropsType";

const Address = ({ data }: PropsType) => {
 return (
  <div className="w-full flex flex-col gap-8 p-4 rounded-xl border border-base-300">
   <h2 className="text-md font-bold">Address</h2>
   <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
     <span className="font-bold text-base-content/70">Address Detail</span>
     <span className="font-bold">{data?.address}</span>
    </div>
    <div className="flex flex-row gap-10">
     <div className="flex flex-col gap-2">
      <span className="font-bold text-base-content/70">Country</span>
      <span className="font-bold">{data?.country}</span>
     </div>
     <div className="flex flex-col gap-2">
      <span className="font-bold text-base-content/70">City</span>
      <span className="font-bold">{data?.city}</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Address;
