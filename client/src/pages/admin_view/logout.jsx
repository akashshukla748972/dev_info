import React from "react";
import LogoutCard from "../../components/admin_view/logout/logout_card";
import { useDispatch } from "react-redux";
import { checkAuth, logoutUser } from "../../store/auth_slice/authSlice";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.error) {
        toast.error(data.error.message);
      } else {
        toast.success(data.payload.message || "User loged out successfully.");
        dispatch(checkAuth());
      }
    });
  };
  return (
    <div className="flex flex-1 justify-center items-center">
      <LogoutCard handleLogout={handleLogoutUser} />
    </div>
  );
};

export default Logout;
