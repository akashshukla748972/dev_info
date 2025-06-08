import React from "react";
import { motion } from "framer-motion";

const MessageCard = ({ name, message }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 cursor-pointer"
    >
      <div className="p-4 sm:px-6 flex space-x-4 items-center">
        <img
          src="https://t4.ftcdn.net/jpg/07/28/78/53/360_F_728785396_muNh6GKN3XdVTePE7vGCxPcXgpUBDdaA.jpg"
          className="w-16 h-16 rounded-full"
          alt=""
        />
        <div className="">
          <span className="flex items-center text-lx font-semibold text-gray-100">
            {/* <Icon size={20} className="mr-2" style={{ color }} /> */}
            {name}
          </span>

          <p className="mt-1 text-base font-medium text-gray-400">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageCard;
