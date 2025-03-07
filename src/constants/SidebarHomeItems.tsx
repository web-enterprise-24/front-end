import { SidebarType } from "../types";

import {
 House,
 LogOut,
 LayoutDashboard,
 MessageCircleMore,
 Folder,
} from "lucide-react";

const items: SidebarType[] = [
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
  title: "Document",
  icon: Folder,
  to: "/document",
 },
 {
  id: 5,
  title: "Log out",
  to: "",
  icon: LogOut,
 },
];

export default items;
