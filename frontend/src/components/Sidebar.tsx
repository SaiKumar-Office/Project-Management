import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "../redux/customHooks";

const Sidebar: React.FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);

  // If user not logged in, don't render sidebar
  if (!user) return null;

  const items = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "Projects" },
    { to: "/tasks", label: "Tasks" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="w-72 h-screen bg-white border-r px-6 py-8 flex flex-col"
    >
      {/* Profile Section */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h3 className="mt-2 text-gray-800 font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--primary-green)] text-white shadow-md"
                  : "text-gray-700 hover:bg-green-50"
              }`
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 text-center">
        <div className="text-xs text-gray-500">© {new Date().getFullYear()} YourCompany</div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
