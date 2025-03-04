const UserItem = () => {
 return (
  <div className="flex flex-row gap-2 hover:bg-base-200 rounded-2xl cursor-pointer p-2 transition-colors ease-linear duration-200">
   <div className="avatar">
    <div className="w-16 rounded-full">
     <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
   </div>
   <div className="flex flex-col gap-1">
    <p className="text-primary-content font-bold">Nguyen Van A</p>
    <p className="text-base-300">Offline</p>
   </div>
  </div>
 );
};

export default UserItem;
