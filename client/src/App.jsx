import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ClientView from "./pages/client_view";
import CheckAuth from "./components/common_view/check-auth";
import ClientLayout from "./components/client_view/client_layout";
import AdminLayout from "./components/admin_view/admin_layout";
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
import { checkAuth } from "./store/auth_slice/authSlice";
import AuthLayout from "./components/auth/auth_layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/register";
import Loader from "./pages/common_view/loader";
import AboutLayout from "./components/admin_view/about/about_layout";
import About from "./pages/admin_view/about/about";
import EditProfile from "./pages/admin_view/about/edit_user";
import DashboardLayout from "./components/admin_view/dashboard/dashboard_layout";
import AdminView from "./pages/admin_view/dashboard";
import AboutUser from "./pages/client_view/about/about_me";
import ProjectUser from "./pages/client_view/project/project";
import ExperienceUser from "./pages/client_view/experience/experience";
import ServiceUser from "./pages/client_view/service/service";
import BlogUser from "./pages/client_view/blog/blog";
import TestimonialsUser from "./pages/client_view/testimonials/testimonials";
import {ToastContainer} from "react-toastify"

const App = () => {
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const role = user?.role.includes("admin") ? "admin" : "user";
  const isAuthenticated = state?.isAuthenticated;
  const dispatch = useDispatch();

  const handleGetLogedInUserData = () => {
    dispatch(checkAuth()).then((data) => {
      if (data?.payload?.isSuccess) {
      }
    });
  };
  useEffect(() => {
    handleGetLogedInUserData();
  }, []);

  if (state.isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex h-screen text-gray-100 overflow-hidden">
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
          <Route path="about" element={<AboutUser />} />
          <Route path="projects" element={<ProjectUser />} />
          <Route path="experiences" element={<ExperienceUser />} />
          <Route path="testimonials" element={<TestimonialsUser />} />
          <Route path="services" element={<ServiceUser />} />
          <Route path="blogs" element={<BlogUser />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} role={role}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<AdminView />} />
          </Route>
          <Route path="about" element={<AboutLayout />}>
            <Route index element={<About />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<ProjectLayout />}>
            <Route path="create" element={<CreateProject />} />
            <Route path=":filterBy" element={<Projects />} />
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
      <ToastContainer />
    </div>
  );
};

export default App;
