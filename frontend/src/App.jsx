import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { checkAuth } from "./store/auth_slice/authSlice";
import CheckAuth from "./components/common_view/CheckAuth.jsx";
import AuthLayout from "./components/auth/AuthLayout.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ClientLayout from "./components/client_view/ClientLayout.jsx";
import ClientView from "./pages/client_view/ClientView.jsx";
import AboutUser from "./pages/client_view/about/AboutUser.jsx";
import ProjectUser from "./pages/client_view/project/ProjectUser.jsx";
import TestimonialsUser from "./pages/client_view/testimonials/TestimonialsUser.jsx";
import ServiceUser from "./pages/client_view/service/ServiceUser.jsx";
import BlogUser from "./pages/client_view/blog/BlogUser.jsx";
import AdminLayout from "./components/admin_view/AdminLayout.jsx";
import DashboardLayout from "./components/admin_view/dashboard/DashboardLayout.jsx";
import AdminView from "./pages/admin_view/dashboard/AdminView.jsx";
import AboutLayout from "./components/admin_view/about/AboutLayout.jsx";
import About from "./pages/admin_view/about/About.jsx";
import EditProfile from "./pages/admin_view/about/EditProfile.jsx";
import Skills from "./pages/admin_view/SkillsView.jsx";
import ProjectLayout from "./components/admin_view/project/ProjectLayout.jsx";
import CreateProject from "./pages/admin_view/projects/CreateProject.jsx";
import ProjectView from "./pages/admin_view/projects/ProjectView.jsx";
import Experience from "./pages/admin_view/Experience.jsx";
import Education from "./pages/admin_view/Education.jsx";
import Service from "./pages/admin_view/Service.jsx";
import Testimonial from "./pages/admin_view/Testimonial.jsx";
import Blog from "./pages/admin_view/Blog.jsx";
import Message from "./pages/admin_view/Message.jsx";
import Setting from "./pages/admin_view/Setting.jsx";
import Logout from "./pages/admin_view/Logout.jsx";
import Loader from "./pages/common_view/Loader.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ContactUser from "./pages/client_view/contact/ContactUser.jsx";

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
          <Route path="register" element={<Signup />} />
          <Route path="login" element={<LoginPage />} />
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
          <Route path="contact" element={<ContactUser />} />
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
            <Route path=":filterBy" element={<ProjectView />} />
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
