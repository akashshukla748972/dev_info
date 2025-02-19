import React from "react";
import AdminRouting from "../utils/AdminRouting";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AdminRouting />
    </div>
  );
};

export default Admin;
