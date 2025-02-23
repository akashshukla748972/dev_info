import {
  BookOpenCheck,
  Contact,
  DollarSign,
  LayoutDashboard,
  Menu,
  PanelsTopLeft,
  Rss,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const SidebarItem = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      color: "#6366f1",
      path: "/admin",
    },
    {
      name: "Blogs",
      icon: Rss,
      color: "#6366f1",
      path: "/admin/blogs",
    },
    {
      name: "Skills",
      icon: BookOpenCheck,
      color: "#6366f1",
      path: "/admin/skills",
    },
    {
      name: "Projects",
      icon: PanelsTopLeft,
      color: "#6366f1",
      path: "/admin/projects",
    },
    {
      name: "Contacts",
      icon: Contact,
      color: "#6366f1",
      path: "/admin/contacts",
    },
    {
      name: "Settings",
      icon: Settings,
      color: "#6366f1",
      path: "/admin/settings",
    },
  ];

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSideBarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSideBarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 ">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SidebarItem.map((item, index) => (
            <Link key={index} to={item.path} className={item.color}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "24px" }}
                />

                <AnimatePresence>
                  {isSideBarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap text-gray-100 underline-offset-0"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidenav;
