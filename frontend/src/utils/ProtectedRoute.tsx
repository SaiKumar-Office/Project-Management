// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/customHooks";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = "/" }) => {
  // Get token from Redux store
  const token = useAppSelector((state) => state.loginUser.token);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  // Otherwise, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
