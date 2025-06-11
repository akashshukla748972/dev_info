import React, { useEffect, useState } from "react";
import { topNavbarItem } from "../../configs/client";
import { NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
const TopNavbar = () => {
  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  console.log("theme->", theme);
  const [samllDeviceNavbar, setSamllDeviceNavbar] = useState(false);

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "light") {
      element.classList.remove("dark");
    } else {
      element.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`max-w-full container mx-auto mb-20 px-2 md:px-4 fixed top-0 right-0 left-0 z-50 bg-gray-100 dark:bg-gray-800 ${
        sticky &&
        "sticky-navbar shadow-md bg-gray-100 dark:bg-gray-800 duration-300 transition-all ease-in-out"
      } `}
    >
      <div className="flex flex-1 items-center py-4 justify-between">
        <div className="flex items-center text-xl relative">
          <div className="mr-2 sm:mr-4 lg:hidden hover:bg-gray-400 transition-colors duration-300 w-10 h-10 flex justify-center items-center rounded-full rel">
            {<Menu onClick={() => setSamllDeviceNavbar(!samllDeviceNavbar)} />}
          </div>
          {samllDeviceNavbar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className={` fixed inset-0 right-40 top-[72px] px-4 pb-4 pt-2 bg-gradient-to-br from-gray-200 dark:from-gray-800 via-gray-100 dark:via-gray-900 to-gray-200 dark:to-gray-800 backdrop-blur-md transition-all duration-300 border-r border-r-gray-200`}
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
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-400 dark:bg-gray-700" : "bg-base"
                      } p-2 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-700`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            <span className="bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 px-2 font-bold rounded">
              DEV
            </span>
            INFO
          </h2>
        </div>
        <div className="flex items-center gap-x-10">
          <div className="hidden lg:flex space-x-6 font-medium">
            {topNavbarItem.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `
                  ${
                    isActive
                      ? "text-orange-500"
                      : "text-gray-800 dark:text-gray-200 "
                  } 
                  
                `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-x-6">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="w-fit h-fit"
            >
              {theme === "dark" ? <Sun size={32} /> : <Moon size={32} />}
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-orange-500 text-orange-500 cursor-pointer font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
