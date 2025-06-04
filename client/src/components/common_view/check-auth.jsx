import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ role, children }) => {
  const location = useLocation();
  console.log("Location->", location.pathname);
  console.log("Role->", role);

  if (location.pathname == "/") {
    if (role == "admin") {
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
