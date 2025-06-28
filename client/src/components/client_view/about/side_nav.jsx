import React, { useState } from "react";
import { sidebarItemClientView } from "../../../configs/client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <motion.div
      className={`fixed h-full overflow-scroll hiddenScrollbar z-10 transition-all ease-in-out duration-300 flex-shrink-0   ${
        openSidebar ? "w-64" : "w-0 lg:w-64"
      }`}
    >
      <div className="h-full bg-gray-100 dark:bg-gray-900 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenSidebar(!openSidebar)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu />
        </motion.button>
        <nav className="mt-8">
          {sidebarItemClientView.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
              key={item.href}
              to={item.href}
            >
              <motion.div className="flex items-center p-4 text-sm font-medium">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  <motion.span className="ml-4 whitespace-nowrap">
                    {item.name}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </NavLink>
          ))}
        </nav>
      </div>

      <h1 className="text-gray-500">hello</h1>
    </motion.div>
  );
};

export default SideNav;
