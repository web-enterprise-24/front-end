import PropsType from "./PropsType";

const Header = ({ data }: PropsType) => {
 return (
  <div className="w-full flex flex-row gap-2 items-center p-4 rounded-xl border border-base-300">
   <div className="avatar">
    <div className="w-24 rounded-full">
     <img src={data?.profilePicUrl?.toString()} alt="Avatar" />
    </div>
   </div>
   <div className="flex flex-col gap-2">
    <div className="flex flex-row gap-2">
     <p className="font-bold">{data?.name}</p>
     <div
      className={`badge ${data?.verified ? "badge-primary" : "badge-accent"}`}
     >
      {data?.verified ? "active" : "inactive"}
     </div>
    </div>
    <p className="font-bold text-base-content/70">{data?.roles[0]?.code}</p>
   </div>
  </div>
 );
};

export default Header;
