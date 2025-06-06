import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 flex justify-center items-center">
      <div className="w-20 h-20 border-4 border-gray-700 border-r-gray-100 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
