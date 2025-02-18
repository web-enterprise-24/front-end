import { LayoutDashboard, LogOut } from "lucide-react";

import { UserDropdownItemsType } from "../types";

const items: UserDropdownItemsType[] = [
 {
  id: 1,
  title: "Dashboard",
  icon: LayoutDashboard,
  to: "/dashboard",
 },
 {
  id: 2,
  title: "Logout",
  icon: LogOut,
 },
];

export default items;
