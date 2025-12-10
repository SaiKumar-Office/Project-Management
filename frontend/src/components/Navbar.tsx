import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHooks";
import { logoutUser } from "../redux/Login/loginUserSlice";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.currentUser);
  const token = useAppSelector((state) => state.loginUser.token);

  if (!user) return null;

  const handleLogout = async () => {
    if (token) {
      const result = await dispatch(logoutUser(token));

      // If logout is successful → redirect
      if (logoutUser.fulfilled.match(result)) {
        navigate("/login");
        console.log("User logged out successfully");  // 🔥 redirect to login
      }
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-soft">
      <div className="text-lg font-semibold text-gray-800">
        Welcome to Project Management Tool
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">{user.name}</span>

        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
