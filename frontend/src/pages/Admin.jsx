import React from "react";
import AdminRouting from "../utils/AdminRouting";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

const Admin = () => {
  return (
    <main className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
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
