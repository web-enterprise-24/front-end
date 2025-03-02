import React, { ReactNode } from "react";

import { DropdownItemsType } from "../types";
import { Link } from "react-router-dom";

type Props = {
 children: ReactNode;
 items: DropdownItemsType[];
 variant: "notification" | "user" | "management-action";
 isHidden?: boolean;
 onClick?: (title?: string) => void;
};

const Dropdown = ({
 children,
 items,
 variant,
 isHidden,
 onClick = () => {},
}: Props) => {
 if (["user", "management-action"].includes(variant)) {
  if (variant === "management-action" && isHidden) {
   items = items.slice(0, 2);
  }

  return (
   <div className="dropdown dropdown-end">
    {children}
    <ul
     tabIndex={0}
     className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl font-bold"
    >
     {items &&
      items.map((item) => {
       let Component: React.ElementType | string = "a";
       const prop: { to?: string } = {};
       if (item.to) {
        Component = Link;
        prop.to = item.to;
       }

       return (
        <li key={item.id} onClick={() => onClick(item.title)}>
         <Component {...prop}>
          <item.icon />
          {item.title}
         </Component>
        </li>
       );
      })}
    </ul>
   </div>
  );
 } else if (variant === "notification") {
  return (
   <div className="dropdown dropdown-end">
    {children}
    <ul
     tabIndex={0}
     className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl font-bold mt-5 min-h-24"
    >
     {items.length > 0 ? (
      items.map((item) => {
       let Component: React.ElementType | string = "a";
       const prop: { to?: string } = {};
       if (item.to) {
        Component = Link;
        prop.to = item.to;
       }

       return (
        <li key={item.id}>
         <Component {...prop}>
          <item.icon />
          {item.title}
         </Component>
        </li>
       );
      })
     ) : (
      <div className="w-full h-24 flex items-center justify-center">
       <span>No notification</span>
      </div>
     )}
    </ul>
   </div>
  );
 }
};

export default Dropdown;
