import { X } from "lucide-react";

const Header = () => {
 return (
  <div className="w-full h-20 flex flex-row items-center justify-between p-4 border-b border-base-200">
   <div className="flex flex-row gap-2">
    <div className="avatar">
     <div className="w-16 rounded-full relative">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
     </div>
     <div className="size-3 absolute bottom-0 right-0 rounded-full bg-green-400 ring-2 ring-green-200"></div>
    </div>
    <div className="flex flex-col gap-1">
     <p className="text-primary-content font-bold">Nguyen Van A</p>
     <p className="text-base-300">Offline</p>
    </div>
   </div>
   <X className="cursor-pointer" />
  </div>
 );
};

export default Header;
