import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LogoutCard = ({ handleLogout }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="bg-gray-800 p-6 w-100 flex flex-col space-y-8 rounded-xl">
        <h2 className="text-center">Do you want to logout?</h2>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleLogout}
            className="text-red-700 font-semibold border border-gray-600 py-1 px-6 rounded-full"
          >
            Logout
          </button>
          <Link
            className="text-gray-200 font-semibold border border-gray-600 py-1 px-6 rounded-full"
            to={"/admin/dashboard"}
          >
            Cancel
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoutCard;
