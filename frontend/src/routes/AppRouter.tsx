import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { RootState } from "../redux/store";
import { loadCurrentUser } from "../redux/Login/loginUserSlice";

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 },
};

const pageTransition = {
  type: "tween" as const,
  ease: easeInOut,
  duration: 0.5,
};

const AppRouter: React.FC = () => {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const isLoggedIn = !!auth.token && !!auth.user;

  // Load current user on app start if token exists
  useEffect(() => {
    if (auth.token && !auth.user) {
      dispatch(loadCurrentUser() as any).then(() => {
        toast.success("User logged in successfully!");
      });
    }
  }, [auth.token, auth.user, dispatch]);

  return (
    <div className="flex min-h-screen">
      {isLoggedIn && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isLoggedIn && <Navbar />}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // animate only page changes
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Routes location={location}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Add protected routes here */}
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AppRouter;
