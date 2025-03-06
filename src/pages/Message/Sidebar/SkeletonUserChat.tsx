const SkeletonUserChat = () => {
 return (
  <div className="flex flex-row items-start gap-2 p-2">
   <div className="avatar">
    <div className="w-16 rounded-full skeleton">
     {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
    </div>
   </div>
   <div className="w-full flex flex-col gap-1">
    <div className="skeleton h-2 w-1/2"></div>
    <div className="skeleton h-2 w-1/2"></div>
   </div>
  </div>
 );
};

export default SkeletonUserChat;
