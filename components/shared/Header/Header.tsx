"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  Search,
  Sun,
  Moon,
  User,
  ChevronDown,
  ChevronRight,
  Home,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconButtonProps,
  MobileNavItemProps,
  NavigationItem,
  NavItemContentProps,
  NavLinkProps,
} from "./header.types";
import Link from "next/link";

const navigationItems: NavigationItem[] = [
  {
    name: "Products",
    href: "/products",
    subItems: [
      { name: "Men's Clothing", href: "/products/mens" },
      { name: "Women's Clothing", href: "/products/womens" },
      { name: "Accessories", href: "/products/accessories" },
      { name: "Footwear", href: "/products/footwear" },
    ],
  },
  {
    name: "Collections",
    href: "/collections",
    subItems: [
      { name: "Summer 2025", href: "/collections/summer-2024" },
      { name: "Winter Essentials", href: "/collections/winter" },
      { name: "Limited Edition", href: "/collections/limited" },
      { name: "Sustainable", href: "/collections/sustainable" },
    ],
  },
  {
    name: "New Arrivals",
    href: "/new",
    subItems: [
      { name: "This Week", href: "/new/this-week" },
      { name: "This Month", href: "/new/this-month" },
      { name: "Coming Soon", href: "/new/coming-soon" },
    ],
  },
  {
    name: "Sale",
    href: "/sale",
    subItems: [
      { name: "Clearance", href: "/sale/clearance" },
      { name: "Last Chance", href: "/sale/last-chance" },
      { name: "Bundle Deals", href: "/sale/bundles" },
    ],
  },
];

const NavItemContent: React.FC<NavItemContentProps> = ({ name, subItems }) => (
  <span className="flex items-center">
    {name}
    {subItems && subItems.length > 0 && (
      <ChevronDown className="ml-1 h-4 w-4" />
    )}
  </span>
);

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        className={`group px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${className}`}
      >
        {children}
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
      </a>
      <AnimatePresence>
        {isHovered && children.props?.subItems && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-50"
          >
            {children.props.subItems.map((subItem) => (
              <a
                key={subItem.name}
                href={subItem.href}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {subItem.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  badge,
  onClick,
  label,
}) => (
  <button
    onClick={onClick}
    className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
    {badge != null && (
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  icon: Icon,
  label,
  badge,
  onClick,
  subItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={() => (subItems ? setIsOpen(!isOpen) : onClick?.())}
        className="flex items-center justify-between w-full p-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </div>
        {badge != null && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-full">
            {badge}
          </span>
        )}
        {subItems && (
          <ChevronRight
            className={`h-5 w-5 transform transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </button>
      <AnimatePresence>
        {isOpen && subItems && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-gray-50 dark:bg-gray-800"
          >
            {subItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-8 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      // Update meta theme-color for dark mode
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#111827"); // gray-900
    } else {
      document.documentElement.classList.remove("dark");
      // Update meta theme-color for light mode
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#ffffff");
    }
  }, [isDarkMode]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const MobileSearch = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden border-t border-gray-200 dark:border-gray-800"
    >
      <form onSubmit={handleSearch} className="p-4">
        <div className="relative flex items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 text-base rounded-full border-none dark:text-white bg-gray-100 dark:bg-gray-800 
            focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          />
          <button
            title="submit search"
            type="submit"
            className="absolute right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </form>
    </motion.div>
  );

  // Modified desktop search section:
  const DesktopSearch = () => (
    <form onSubmit={handleSearch} className="relative group">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-40 focus:w-60 px-4 py-2 text-sm rounded-full border-none dark:text-white bg-gray-100 dark:bg-gray-800 
        focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
      />
      <button
        title="submit search"
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <Search className="h-4 w-4 text-gray-400" />
      </button>
    </form>
  );

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                shoply
              </span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                <NavItemContent name={item.name} subItems={item.subItems} />
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search"
                className="w-40 focus:w-60 px-4 py-2 text-sm rounded-full border-none dark:text-white bg-gray-100 dark:bg-gray-800 
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <IconButton
              icon={isDarkMode ? Sun : Moon}
              onClick={() => setIsDarkMode(!isDarkMode)}
              label="Toggle theme"
            />
            <IconButton icon={Heart} badge={2} label="Wishlist" />
            <IconButton icon={ShoppingBag} badge={3} label="Cart" />
            <IconButton icon={User} label="Account" />
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              title="search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 text-sm rounded-full border-none dark:text-white bg-gray-100 dark:bg-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 overflow-y-auto"
          >
            <div className="pb-32">
              <MobileNavItem icon={Home} label="Home" onClick={() => {}} />
              {navigationItems.map((item) => (
                <MobileNavItem
                  key={item.name}
                  icon={ChevronRight}
                  label={item.name}
                  subItems={item.subItems}
                />
              ))}
              <MobileNavItem icon={Heart} label="Wishlist" badge={2} />
              <MobileNavItem icon={ShoppingBag} label="Cart" badge={3} />
              <MobileNavItem icon={Bell} label="Notifications" badge={1} />
              <MobileNavItem
                icon={isDarkMode ? Sun : Moon}
                label="Theme"
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
              <MobileNavItem icon={Settings} label="Settings" />
              <MobileNavItem icon={HelpCircle} label="Help Center" />
              <MobileNavItem icon={LogOut} label="Sign Out" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
