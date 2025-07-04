import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavbar from "./top_navbar";
import FooterUser from "./common/FooterUser";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../../store/user_slice/userSlice";
import { getAllProject } from "../../store/project_slice/projectSlice";

const ClientLayout = () => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const protectedRoutes = [
    "projects",
    "contact",
    "services",
    "blogs",
    "testimonials",
    "about-me",
  ];

  useEffect(() => {
    const shouldProtect = protectedRoutes.some((route) =>
      pathname.includes(route)
    );

    if (shouldProtect && !isAuthenticated) {
      dispatch(showForm());
    }
    dispatch(getAllProject());
  }, [pathname, dispatch]);

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
