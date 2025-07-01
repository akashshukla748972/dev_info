import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { topNavbarItem } from "../../configs/client";
import { X } from "lucide-react";

const SmallDeviceSideNav = ({ setSamllDeviceNavbar }) => {
  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-gray-100 dark:bg-gray-800 fixed h-screen w-full top-19 -left-0"
      >
        <div className="flex justify-end items-center my-2">
          <span
            onClick={() => setSamllDeviceNavbar(false)}
            className="flex justify-center items-center rounded-full h-10 w-10 hover:bg-gray-400 transition-colors duration-300"
          >
            <X />
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          {topNavbarItem.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setSamllDeviceNavbar(false)}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-gray-400 dark:bg-gray-700" : ""
                } p-2 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-700`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SmallDeviceSideNav;
