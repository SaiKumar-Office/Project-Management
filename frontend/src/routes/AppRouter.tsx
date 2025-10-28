import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard";
// import ProjectDetail from "../pages/ProjectDetail";

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        // transition={pageTransition}
        className="p-6"
      >
        <Routes location={location}>
          {/* <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:id" element={<ProjectDetail />} /> */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppRouter;
