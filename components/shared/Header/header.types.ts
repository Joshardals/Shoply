import { LucideIcon } from "lucide-react";

export interface SubItem {
  name: string;
  href: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  subItems?: SubItem[];
}

export interface NavItemContentProps {
  name: string;
  subItems?: SubItem[];
}

interface NavLinkChildProps {
  children: string;
  subItems?: SubItem[];
}

export interface NavLinkProps {
  href: string;
  children: React.ReactElement<NavLinkChildProps>;
  className?: string;
}

export interface IconButtonProps {
  icon: LucideIcon;
  badge?: number;
  onClick?: () => void;
  label: string;
}

export interface MobileNavItemProps {
  icon: LucideIcon;
  label: string;
  badge?: number;
  onClick?: () => void;
  subItems?: SubItem[];
}
