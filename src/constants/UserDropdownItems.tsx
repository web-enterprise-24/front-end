import { LayoutDashboard, LogOut } from "lucide-react";

import { DropdownItemsType } from "../types";

const items: DropdownItemsType[] = [
 {
  id: 1,
  title: "Dashboard",
  icon: LayoutDashboard,
  to: "/dashboard",
 },
 {
  id: 2,
  title: "Log out",
  icon: LogOut,
 },
];

export default items;
