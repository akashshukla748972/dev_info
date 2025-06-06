import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ClientView from "./pages/client_view";
import AdminView from "./pages/admin_view";
import CheckAuth from "./components/common_view/check-auth";
import ClientLayout from "./components/client_view/client_layout";
import AdminLayout from "./components/admin_view/admin_layout";
import About from "./pages/admin_view/about";
import Skills from "./pages/admin_view/skill";
import Projects from "./pages/admin_view/projects/projects";
import Experience from "./pages/admin_view/experience";
import Education from "./pages/admin_view/education";
import Service from "./pages/admin_view/service";
import Testimonial from "./pages/admin_view/testimonial";
import Blog from "./pages/admin_view/blog";
import Message from "./pages/admin_view/message";
import Setting from "./pages/admin_view/setting";
import Logout from "./pages/admin_view/logout";
import ProjectLayout from "./components/admin_view/project/project_layout";
import CreateProject from "./pages/admin_view/projects/create_project";
import { useSelector, useDispatch } from "react-redux";
import {
  checkAuth,
  loginUser,
  registerUser,
} from "./store/auth_slice/authSlice";
import toast, { Toaster } from "react-hot-toast";
import AuthLayout from "./components/auth/auth_layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/register";

const App = () => {
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const role = user?.role.includes("admin") ? "admin" : "user";
  const isAuthenticated = state?.isAuthenticated;
  const dispatch = useDispatch();
  console.log(state);

  const handleGetLogedInUserData = () => {
    dispatch(checkAuth());
  };
  useEffect(() => {
    handleGetLogedInUserData();
  }, []);

  
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} role={role} />}
        />
        <Route
          path="/auth"
          element={
            <CheckAuth role={role} isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/user"
          element={
            <CheckAuth role={role} isAuthenticated={isAuthenticated}>
              <ClientLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ClientView />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} role={role}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminView />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<ProjectLayout />}>
            <Route index element={<Projects />} />
            <Route path="create" element={<CreateProject />} />
          </Route>
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
      <Toaster />
    </div>
  );
};

export default App;
