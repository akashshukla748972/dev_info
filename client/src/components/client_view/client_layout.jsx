import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./top_navbar";
import FooterUser from "./common/footer";

const ClientLayout = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="flex-1 overflow-auto relative bg-white text-black dark:bg-gray-900 dark:text-gray-50">
      <TopNavbar scrollContainerRef={scrollContainerRef} />

      <main className="mt-[72px] flex-1 flex-col flex bg-muted/40 ">
        <Outlet />
      </main>
      <FooterUser />
    </div>
  );
};

export default ClientLayout;
