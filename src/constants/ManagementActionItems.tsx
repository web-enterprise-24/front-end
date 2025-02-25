import { UserRoundMinus, UserRoundPen } from "lucide-react";

import { DropdownItemsType } from "../types";

const items: DropdownItemsType[] = [
 {
  id: 1,
  title: "Edit",
  icon: UserRoundPen,
 },
 {
  id: 2,
  title: "Delete",
  icon: UserRoundMinus,
 },
];

export default items;
