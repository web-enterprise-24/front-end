import { SidebarItemsHomeType } from "../types";

import {
 House,
 LogOut,
 LayoutDashboard,
 MessageCircleMore,
} from "lucide-react";

const items: SidebarItemsHomeType[] = [
 {
  id: 1,
  title: "Home",
  icon: House,
  to: "/",
 },
 {
  id: 2,
  title: "Dashboard",
  icon: LayoutDashboard,
  to: "/dashboard",
 },
 {
  id: 3,
  title: "Chat",
  icon: MessageCircleMore,
  to: "/message",
 },
 {
  id: 4,
  title: "Logout",
  icon: LogOut,
 },
];

export default items;
