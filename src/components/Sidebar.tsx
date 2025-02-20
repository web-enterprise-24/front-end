import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import { SidebarItemsHomeType } from "../types";
import { useAuthStore, useGeneralStore } from "../store";
import { useShallow } from "zustand/shallow";
import { useRef } from "react";

type PropsType = {
 page?: string;
 items?: SidebarItemsHomeType[];
 onClick?: (title?: string) => void;
};

const Sidebar = ({ items, page, onClick = () => {} }: PropsType) => {
 const authUser = useAuthStore((state) => state.authUser);
 const [modalElement, setIsShowingModal] = useGeneralStore(
  useShallow((state) => [state.modalElement, state.setIsShowingModal])
 );

 const drawerRef = useRef<HTMLInputElement | null>(null);

 return (
  <div
   className={`drawer md:hidden ${page === "home" && "lg:hidden"} w-[58px]`}
  >
   <input
    id="my-drawer"
    type="checkbox"
    className="drawer-toggle"
    ref={drawerRef}
   />
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
          <img src={authUser?.profilePicUrl?.toString()} alt="Avatar" />
         </div>
        </div>
        <div className="flex flex-col items-center gap-1">
         <p>{authUser.name}</p>
         <p className="italic text-[10px]">{authUser.roles[0].code}</p>
        </div>
        {page === "home" &&
         authUser &&
         authUser.roles?.[0]?.code === "STAFF" && (
          <Link to="/management" className="text-xs italic underline">
           Go to management page
          </Link>
         )}
       </>
      ) : (
       <button
        className="btn btn-primary w-full"
        onClick={() => {
         modalElement?.showModal();
         setIsShowingModal(true);
        }}
       >
        Log in
       </button>
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
            item.title === "Log out" && !authUser && "hidden"
           }`}
           onClick={() => onClick(item.title)}
          >
           <Component
            {...prop}
            onClick={() => {
             if (drawerRef.current) {
              drawerRef.current.click();
             }
            }}
           >
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
