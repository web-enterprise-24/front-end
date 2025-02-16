import { House, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
 return (
  <div className="w-full h-20 bg-base shadow-md shadow-base-300">
   <div className="container mx-auto w-full h-full flex flex-row justify-between">
    <div className="w-[10%] h-auto">
     <img
      className="w-full h-full object-cover"
      src="/logo-background-transparent.webp"
      alt="Logo"
     />
    </div>
    <nav className="h-full flex flex-row gap-6">
     <Link to={"/"} className="h-full flex items-center cursor-pointer">
      <House className="w-8 h-8" />
     </Link>
     <div className="h-full flex items-center cursor-pointer">
      <MessageCircleMore className="w-8 h-8" />
     </div>
    </nav>
    <div className="flex flex-row h-full items-center gap-8">
     <button className="btn btn-ghost font-bold">Management</button>
     <div className="form-control">
      <input
       type="text"
       placeholder="Search"
       className="input input-bordered border-2 rounded-full w-24 h-10 md:w-auto"
      />
     </div>
     <div className="dropdown dropdown-end">
      <div tabIndex={0} className="avatar cursor-pointer">
       <div className="w-14 rounded-full">
        <img
         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
         alt="Avatar"
        />
       </div>
      </div>
      <ul
       tabIndex={0}
       className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl font-bold"
      >
       <li>
        <Link to={"/dashboard"}>Dashboard</Link>
       </li>
       <li>
        <a>Logout</a>
       </li>
      </ul>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Navbar;
