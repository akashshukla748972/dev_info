import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./top_navbar";

const ClientLayout = () => {
  return (
    <div className="flex flex-col h-screen  w-full bg-white text-black dark:bg-slate-900 dark:text-gray-50">
      <TopNavbar />

      <div className="flex flex-1 flex-col">
        <main className="mt-4 flex-1 flex-col flex bg-muted/40 px-4 md:px-6 pb-4 md:pb-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
