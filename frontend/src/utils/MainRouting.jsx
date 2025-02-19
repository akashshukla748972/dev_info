import React from "react";
import { Route, Routes } from "react-router-dom";
import Client from "../pages/Client";
import Admin from "../pages/Admin";

const MainRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default MainRouting;
