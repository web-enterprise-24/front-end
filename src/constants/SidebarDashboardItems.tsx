import { ChartNoAxesColumnIncreasing, UserRoundPen } from "lucide-react";
import { SidebarType } from "../types";

const items: SidebarType[] = [
 {
  id: 1,
  title: "Profile",
  to: "profile",
  icon: UserRoundPen,
 },
 {
  id: 2,
  title: "Dashboard",
  to: "detailed-dashboard",
  icon: ChartNoAxesColumnIncreasing,
 },
];

export default items;
