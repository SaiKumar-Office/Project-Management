// src/components/ProtectedRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = { children: JSX.Element };

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = useSelector((s: RootState) => s.auth.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
