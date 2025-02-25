import { LucideIcon } from "lucide-react";

type DropdownItemsType = {
 id: number;
 title: string;
 icon: LucideIcon;
 to?: string;
 onClick?: () => void;
};

export default DropdownItemsType;
