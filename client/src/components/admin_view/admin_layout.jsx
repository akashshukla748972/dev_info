import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import AdminHeader from "./admin_header";
import AdminFooter from "./admin_footer";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-900 text-gray-100">
      <Sidebar openSidebar={isSidebarOpen} setOpenSidebar={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="mt-4 flex-1 flex-col flex bg-muted/40 px-4 md:px-6 pb-4 md:pb-6">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
