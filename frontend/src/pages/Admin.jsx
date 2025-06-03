import React from "react";
import AdminRouting from "../utils/AdminRouting";
import Sidebar from "../components/admin/Sidenav";
import Sidenav from "../components/admin/Sidenav";

const Admin = () => {
  document.title = "Dashboard | Admin";
  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gray-900  text-gray-100 overflow-hidden">
      <div className="flex inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidenav />
      <AdminRouting />
    </div>
  );
};

export default Admin;
