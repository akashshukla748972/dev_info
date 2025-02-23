import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import Blogs from "../pages/admin/Blogs";
import Skills from "../pages/admin/Skills";
import ContactMessages from "../pages/admin/ContactMessages";
import Settings from "../pages/admin/Settings";

const AdminRouting = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="projects" element={<Projects />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="skills" element={<Skills />} />
      <Route path="contacts" element={<ContactMessages />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default AdminRouting;
