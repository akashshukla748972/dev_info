import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 text-gray-100 flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
