import { UserPlus, UserRound } from "lucide-react";
import { SidebarType } from "../types";

const items: SidebarType[] = [
 {
  id: 1,
  title: "Add new",
  to: "add-user",
  icon: UserPlus,
 },
 {
  id: 2,
  title: "Student Management",
  to: "student-management",
  icon: UserRound,
 },
 {
  id: 3,
  title: "Tutor Management",
  to: "tutor-management",
  icon: UserRound,
 },
];

export default items;
