import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientView from "./pages/client_view";
import AdminView from "./pages/admin_view";
import CheckAuth from "./components/common_view/check-auth";
import ClientLayout from "./components/client_view/client_layout";
import AdminLayout from "./components/admin_view/admin_layout";

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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
