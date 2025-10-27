import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-60 right-0 h-16 bg-[#0d1b2a] text-[#e0e1dd] flex items-center justify-between px-8 shadow-md">
      <h1 className="text-xl font-semibold">Welcome Back 👋</h1>
      <button
        onClick={handleLogout}
        className="bg-[#f4a261] text-black px-4 py-2 rounded-xl hover:bg-[#e76f51] transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
