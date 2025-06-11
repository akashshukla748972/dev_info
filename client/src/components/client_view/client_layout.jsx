import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./top_navbar";

const ClientLayout = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="flex-1 overflow-auto relative bg-white text-black dark:bg-slate-900 dark:text-gray-50">
      <TopNavbar scrollContainerRef={scrollContainerRef} />

      <div className="flex flex-1 flex-col">
        <main className="mt-[72px] flex-1 flex-col flex bg-muted/40 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
