import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Logo from "../../../public/logo.png";
import MainSection from "./home/MainSection";

const ClientView = () => {
  document.title = "DEVINFO | HOME";
  return (
    <div className="min-h-screen flex flex-col text-gray-700 dark:text-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="h-[70vh] w-full grid grid-cols-1 lg:grid-cols-2 my-20"
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
            DEVINFO TECH SOLUTIONS
          </h1>
          <p className="text-[7px] sm:text-[10px] md:text-[12px] lg:text-[14px] md:text-sm dark:text-gray-100  text-gray-900">
            <TypeAnimation
              sequence={[
                "Website Designing (HTML, CSS, JS, React, Tailwind, etc.)",
                1000,
                "Full Stack Web Development (MERN Stack)",
                1000,
                "E-commerce Website Development",
                1000,
                "Portfolio / Business Websites",
                1000,
                "Admin Panels & Dashboards",
                1000,
                "Responsive Design (Mobile Friendly Sites)",
                1000,
                "Web Hosting & Deployment",
                1000,
              ]}
              wrapper="span"
              speed={30}
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={Logo}
            alt=""
            className="w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full shadow-2xl shadow-gray-500"
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="p-4 md:p-6 lg:p-10">
          <MainSection />
        </div>
      </motion.section>
    </div>
  );
};

export default ClientView;
