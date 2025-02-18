import { House, MessageCircleMore, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import MobileNavbar from "./MobileNavbar";
import { SidebarHomeItems, UserDropdownItems } from "../constants";
import Dropdown from "./Dropdown";
import { useAuthStore, useGeneralStore } from "../store";

const Navbar = () => {
 const [modalElement, setForm, setIsShowingModal] = useGeneralStore(
  useShallow((state) => [
   state.modalElement,
   state.setForm,
   state.setIsShowingModal,
  ])
 );
 const authUser = useAuthStore((state) => state.authUser);

 const handleClickLogin = () => {
  setForm("login");
  modalElement?.showModal();
  setIsShowingModal();
 };

 const handleClickSignup = () => {
  setForm("signup");
  modalElement?.showModal();
  setIsShowingModal();
 };

 return (
  <div className="max-md:flex items-center justify-around max-md:px-2 w-full h-20 bg-base shadow-md shadow-base-300">
   <MobileNavbar items={SidebarHomeItems} />
   {/* Large screen nav */}
   <div className="hidden md:flex flex-row justify-between container mx-auto px-4 max-[821px]:px-2 w-full h-full ">
    <div className="w-36 h-full">
    <Link to={"/"} className="h-full flex items-center cursor-pointer">
     <img className="w-full h-full object-cover" src="/logo.webp" alt="Logo" />
     </Link>
    </div>
    <nav className="h-full flex flex-row gap-6 ">
     <Link to={"/"} className="h-full flex items-center cursor-pointer">
      <House className="w-8 h-8" />
     </Link>
     <Link to={"/message"} className="h-full flex items-center cursor-pointer">
      <MessageCircleMore className="w-8 h-8"/>
     </Link>
    </nav>
    <div className="flex flex-row h-full items-center gap-8">
     {authUser && (
      <Link to={"/management"} className="btn btn-ghost font-bold">
       Management
      </Link>
     )}
     <div className="form-control">
      <input
       type="text"
       placeholder="Search"
       className="input input-bordered border-2 rounded-full w-24 h-10 md:w-auto"
      />
     </div>

     {authUser ? (
      <>
       <Dropdown items={[]} variant={"notification"}>
        <div tabIndex={0} className="relative w-7 h-7 cursor-pointer">
         <span className="animate-ping w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline" />
         <span className="w-3 h-3 absolute top-0 right-0 bg-info rounded-full flex-inline" />
         <Bell className="w-full h-full" />
        </div>
       </Dropdown>
       <Dropdown items={UserDropdownItems} variant={"user"}>
        <div tabIndex={0} className="avatar cursor-pointer">
         <div className="w-14 rounded-full">
          <img
           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
           alt="Avatar"
          />
         </div>
        </div>
       </Dropdown>
      </>
     ) : (
      <div className="flex flex-row gap-1">
       <button
        className="btn btn-primary rounded-xl"
        onClick={handleClickLogin}
       >
        Log in
       </button>
       <button className="btn btn-ghost rounded-xl" onClick={handleClickSignup}>
        Sign up
       </button>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default Navbar;
