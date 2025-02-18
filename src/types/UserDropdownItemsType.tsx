import { LucideIcon } from "lucide-react";

type UserDropdownItemsType = {
 id: number;
 title: string;
 icon: LucideIcon;
 to?: string;
 onClick?: () => void;
};

export default UserDropdownItemsType;
