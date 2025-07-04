import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { useDispatch } from "react-redux";
import { getLoggedAdminData } from "../../store/about_slice/adminSlice";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "DEVINGO | DASHBOARD";
    dispatch(getLoggedAdminData());
  }, []);
  return (
    <div className="flex h-screen  w-full bg-gray-900 text-gray-100">
      <Sidebar openSidebar={isSidebarOpen} setOpenSidebar={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="mt-4 flex-1 flex-col flex bg-muted/40 px-4 md:px-6 pb-4 md:pb-6 overflow-auto">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
