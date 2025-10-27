import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaProjectDiagram, FaTasks, FaHome } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-full w-60 bg-[#1b263b] text-[#e0e1dd] shadow-lg"
    >
      <h2 className="text-2xl font-bold p-6 text-[#f4a261]">PM Tool</h2>
      <ul className="space-y-3 mt-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-[#415a77] transition-all duration-300 ${
                isActive ? "bg-[#415a77]" : ""
              }`
            }
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-[#415a77] transition-all duration-300 ${
                isActive ? "bg-[#415a77]" : ""
              }`
            }
          >
            <FaProjectDiagram /> Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-[#415a77] transition-all duration-300 ${
                isActive ? "bg-[#415a77]" : ""
              }`
            }
          >
            <FaTasks /> Tasks
          </NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
