import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

import { sidebarItem } from "../../configs/admin/";
import { Link } from "react-router-dom";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <motion.div
      className={`relative z-10 transition-all ease-in-out duration-300 flex-shrink-0  ${
        openSidebar ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenSidebar(!openSidebar)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        {/* nav item */}
        <nav className="mt-8">
          {sidebarItem.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />

                <AnimatePresence>
                  {openSidebar && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
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

export default Sidebar;
