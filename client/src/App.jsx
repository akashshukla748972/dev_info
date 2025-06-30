import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ClientView from "./pages/client_view/Index";
import CheckAuth from "./components/common_view/CheckAuth";
import ClientLayout from "./components/client_view/ClientLayout";
import AdminLayout from "./components/admin_view/AdminLayout";
import Skills from "./pages/admin_view/Skill";
import Projects from "./pages/admin_view/projects/Projects";
import Experience from "./pages/admin_view/Experience";
import Education from "./pages/admin_view/Education";
import Service from "./pages/admin_view/Service";
import Testimonial from "./pages/admin_view/Testimonial";
import Blog from "./pages/admin_view/Blog";
import Message from "./pages/admin_view/Message";
import Setting from "./pages/admin_view/Setting";
import Logout from "./pages/admin_view/Logout";
import ProjectLayout from "./components/admin_view/project/ProjectLayout";
import CreateProject from "./pages/admin_view/projects/CreateProject";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/auth_slice/authSlice";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Loader from "./pages/common_view/Loader";
import AboutLayout from "./components/admin_view/about/AboutLayout";
import About from "./pages/admin_view/about/About";
import EditProfile from "./pages/admin_view/about/EditProfile";
import DashboardLayout from "./components/admin_view/dashboard/DashboardLayout";
import AdminView from "./pages/admin_view/dashboard/AdminView";
import AboutUser from "./pages/client_view/about/AboutUser";
import ProjectUser from "./pages/client_view/project/ProjectUser";
import ExperienceUser from "./pages/client_view/experience/Experience";
import ServiceUser from "./pages/client_view/service/ServiceUser";
import BlogUser from "./pages/client_view/blog/Blog";
import TestimonialsUser from "./pages/client_view/testimonials/TestimonialsUser";
import { ToastContainer } from "react-toastify";

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
          <Route path="about-me" element={<AboutUser />} />
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
