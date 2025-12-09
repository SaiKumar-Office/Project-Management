import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { logout } from "../redux/Login/loginUserSlice";

const Navbar: React.FC = () => {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useAppDispatch();

  if (!user) return null; // hide navbar if not logged in

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
      <div className="text-lg font-semibold text-gray-800">Welcome to Project Management Tool</div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">{user.name}</span>
        <button onClick={handleLogout} className="px-3 py-1 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
