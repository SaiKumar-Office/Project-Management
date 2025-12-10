// src/routes/AppRouter.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../utils/ProtectedRoute";

import { useAppDispatch } from "../redux/customHooks";
import { RootState } from "../redux/store";
import { fetchMe } from "../redux/User/userSlice";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const auth = useSelector((state: RootState) => state.loginUser);
  const userState = useSelector((state: RootState) => state.user);

  const isLoggedIn = !!auth.token;
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Is Logged In:", isLoggedIn);
      navigate("/login");
    } else if (!isLoggedIn === false) {
      console.log("Is Logged In:", isLoggedIn);
      navigate("/dashboard");
    } 
  }, [isLoggedIn, navigate]);

  // Load current user if token exists but user info is missing
  useEffect(() => {
    if (auth.token && !userState.currentUser) {
      dispatch(fetchMe(auth.token) as any)
        .unwrap()
        .catch(() => {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        });
    }
  }, [auth.token, userState.currentUser, dispatch, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar visible only when logged in */}
      {isLoggedIn && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Navbar visible only when logged in */}
        {isLoggedIn && <Navbar />}

        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}>
              <Routes>
                {/* Public Routes */}
               <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />

                {/* Root redirects */}
                <Route
                  path="/"
                  element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />}
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* Add more protected routes here */}
                </Route>

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AppRouter;
