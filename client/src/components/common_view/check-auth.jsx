import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ role, isAuthenticated, children }) => {
  const location = useLocation();

  console.log(!isAuthenticated && !location.pathname.includes("/auth"));
  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth/login"} />;
  }

  if (isAuthenticated && location.pathname.includes("/auth")) {
    if (role == "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/user/home"} />;
    }
  }

  if (location.pathname == "/") {
    if (role == "admin" && isAuthenticated) {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/user/home"} />;
    }
  }

  if (role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to={"/user/home"} />;
  }

  if (role == "admin" && location.pathname.includes("/user")) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  return <>{children}</>;
};

export default CheckAuth;
