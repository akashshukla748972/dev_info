import React from "react";
import { Outlet } from "react-router-dom";

const AboutLayout = () => {
  return (
    <main className="mt-4 flex-1 flex-col flex bg-muted/40 px-4 md:px-6 pb-4 md:pb-6">
      <Outlet />
    </main>
  );
};

export default AboutLayout;
