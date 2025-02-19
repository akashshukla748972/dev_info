import React from "react";
import AdminRouting from "../utils/AdminRouting";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

const Admin = () => {
  document.title = "Dashboard | Admin";
  return (
    <main className="w-full h-screen flex">
      <div className="w-[20%] border-r-[0.5px] p-6">
        <Sidebar />
      </div>
      <div className="w-[80%] border-r-[0.5px] p-6">
        <div className="">
          <Navbar />
        </div>
        <div className="">
          <AdminRouting />
        </div>
      </div>
    </main>
  );
};

export default Admin;
