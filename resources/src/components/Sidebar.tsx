import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import { SidebarItemsHomeType } from "../types";
import { useAuthStore, useGeneralStore } from "../store";
import { useShallow } from "zustand/shallow";

type PropsType = {
 page?: string;
 items?: SidebarItemsHomeType[];
};

const Sidebar = ({ items, page }: PropsType) => {
 const authUser = useAuthStore((state) => state.authUser);
 const [modalElement, setIsShowingModal, setForm] = useGeneralStore(
  useShallow((state) => [
   state.modalElement,
   state.setIsShowingModal,
   state.setForm,
  ])
 );

 return (
  <div className="drawer md:hidden w-[58px] ">
   <input id="my-drawer" type="checkbox" className="drawer-toggle" />
   <div className="drawer-content">
    {/* Page content here */}
    <label
     htmlFor="my-drawer"
     className="btn btn-primary rounded-xl drawer-button"
    >
     <Menu />
    </label>
   </div>
   <div className="drawer-side z-[9999]">
    <label
     htmlFor="my-drawer"
     aria-label="close sidebar"
     className="drawer-overlay"
    ></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-[9999]">
     {/* Sidebar content here */}
     <div className="w-full flex flex-col items-center gap-2 pb-2 border-b border-md border-accent-content">
      {authUser ? (
       <>
        <div className="avatar">
         <div className="w-20 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
         </div>
        </div>
        <p>Bruno Mar</p>
        {page === "home" && (
         <Link to="/management" className="text-xs italic underline">
          Go to management page
         </Link>
        )}
       </>
      ) : (
       <div className="flex flex-row gap-2">
        <button
         className="btn btn-primary"
         onClick={() => {
          setForm("login");
          modalElement?.showModal();
          setIsShowingModal();
         }}
        >
         Log in
        </button>
        <button
         className="btn btn-ghost"
         onClick={() => {
          setForm("signup");
          modalElement?.showModal();
          setIsShowingModal();
         }}
        >
         Sign up
        </button>
       </div>
      )}
     </div>
     <div className={`${page === "management" && "flex"} flex-col gap-96`}>
      <div>
       {items &&
        items.map((item) => {
         let Component: React.ElementType | string = "a";
         const prop: { to?: string } = {};
         if (item.to) {
          Component = Link;
          prop.to = item.to;
         }

         return (
          <li
           key={item.id}
           className={`mt-2 ${
            item.title === "Logout" && !authUser && "hidden"
           }`}
          >
           <Component {...prop}>
            <item.icon />
            {item.title}
           </Component>
          </li>
         );
        })}
      </div>
      {page === "management" && (
       <Link to={"/"} className="btn bg-primary text-base-300">
        Back to home
       </Link>
      )}
     </div>
    </ul>
   </div>
  </div>
 );
};

export default Sidebar;
