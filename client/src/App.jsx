import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientView from "./pages/client_view";
import AdminView from "./pages/admin_view";
import CheckAuth from "./components/common_view/check-auth";
import ClientLayout from "./components/client_view/client_layout";
import AdminLayout from "./components/admin_view/admin_layout";
import About from "./pages/admin_view/about";
import Skills from "./pages/admin_view/skill";
import Projects from "./pages/admin_view/projects";
import Experience from "./pages/admin_view/experience";
import Education from "./pages/admin_view/education";
import Service from "./pages/admin_view/service";
import Testimonial from "./pages/admin_view/testimonial";
import Blog from "./pages/admin_view/blog";
import Message from "./pages/admin_view/message";
import Setting from "./pages/admin_view/setting";
import Logout from "./pages/admin_view/logout";

const App = () => {
  const role = "admin";
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<CheckAuth role={role} />} />
        <Route
          path="/user"
          element={
            <CheckAuth role={role}>
              <ClientLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ClientView />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth role={role}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminView />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experiences" element={<Experience />} />
          <Route path="educations" element={<Education />} />
          <Route path="services" element={<Service />} />
          <Route path="testimonials" element={<Testimonial />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="messages" element={<Message />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
