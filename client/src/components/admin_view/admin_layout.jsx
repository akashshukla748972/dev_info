import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-gray-900 text-gray-100">
      <Sidebar openSidebar={isSidebarOpen} setOpenSidebar={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
