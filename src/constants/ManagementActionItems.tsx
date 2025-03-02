import { Unplug, UserRoundMinus, UserRoundPen } from "lucide-react";

import { DropdownItemsType } from "../types";

const items: DropdownItemsType[] = [
 {
  id: 1,
  title: "Edit",
  icon: UserRoundPen,
 },
 {
  id: 2,
  title: "Deactivate",
  icon: UserRoundMinus,
 },
 {
  id: 3,
  title: "Deallocate",
  icon: Unplug,
 },
];

export default items;
