import React, { useEffect, useState } from "react";
import { topNavbarItem } from "../../configs/client";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import SmallDeviceSideNav from "./SmallDeviceSideNav";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const TopNavbar = ({ scrollContainerRef }) => {
  const { isSubscribed, user } = useSelector((state) => state.auth);
  const [userPopup, setUserPopup] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
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
      console.log("ScrollY:", window.scrollY);
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (samllDeviceNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [samllDeviceNavbar]);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 max-w-full container mx-auto px-2 md:px-4 shadow-md bg-gray-100 dark:bg-transparent backdrop-blur-2xl`}
    >
      <div className="flex flex-1 items-center py-4 justify-between">
        <div className="flex items-center text-xl relative">
          <div className="mr-2 sm:mr-4 lg:hidden hover:bg-gray-400 transition-colors duration-300 w-10 h-10 flex justify-center items-center rounded-full rel">
            {<Menu onClick={() => setSamllDeviceNavbar(!samllDeviceNavbar)} />}
          </div>
          {samllDeviceNavbar && (
            <SmallDeviceSideNav setSamllDeviceNavbar={setSamllDeviceNavbar} />
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
          <div className="flex items-center gap-x-6 relative">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="w-fit h-fit"
            >
              {theme === "dark" ? <Sun size={32} /> : <Moon size={32} />}
            </button>
            {!isSubscribed ? (
              <button className="px-6 py-2 rounded-full border-2 border-orange-500 text-orange-500 cursor-pointer font-semibold">
                Subscribe
              </button>
            ) : (
              <div
                onClick={() => setUserPopup(true)}
                className="flex items-center space-x-2 cursor-pointer py-2 px-3"
              >
                {user.name ? (
                  <p className="font-semibold">{user.name.slice(0, 10)}</p>
                ) : (
                  <p className="w-8 h-8 flex justify-center items-center bg-orange-500 rounded-full">
                    {user.email.slice(0, 2).toUpperCase()}
                  </p>
                )}{" "}
                <button className="w-fit">
                  <ChevronDown />
                </button>
              </div>
            )}

            {userPopup && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="fixed top-20 min-h-60 right-0 sm:w-1/2 md:w-2/3 lg:w-2/12 bg-gray-100 dark:bg-gray-800 p-6"
                >
                  <div className="flex justify-end">
                    <X
                      onClick={() => setUserPopup(false)}
                      className="w-8 h-8 rounded-full bg-gray-500 p-2 text-xl hover:bg-red-500"
                    />
                  </div>
                  <div className="flex flex-col space-y-3 my-4 items-center">
                    <div className="text-xl font-semibold">
                      <span className="">Name:</span>
                      <span className="">Akash Shukla</span>
                    </div>
                    <div className="text-sm opacity-60">
                      <span className="">Email:</span>
                      <span className="">shukla@gmail.com</span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <button className="w-full p-2 border-2 border-red-500 rounded-md font-semibold text-red-500">
                      Logout
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
