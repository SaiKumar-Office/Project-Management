// src/pages/Login.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/customHooks";
import { loginUser } from "../redux/Login/loginUserSlice";   // removed loadCurrentUser
import { fetchMe } from "../redux/User/userSlice";           // added fetchMe
import Loader from "../components/Loader";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.loginUser);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Load user after login
  useEffect(() => {
    if (auth.token && !currentUser) {
      dispatch(fetchMe(auth.token));   // ⬅ load current user using token
    }

    if (currentUser) {
      navigate("/dashboard");
    }
  }, [auth.token, currentUser, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      {auth.loading && <Loader />}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-soft p-8">
        <h2 className="text-2xl font-semibold text-brand-700 mb-6">Sign in</h2>

        {auth.error && <div className="text-red-500 mb-4">{auth.error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-500 text-white py-2 rounded-xl font-semibold hover:bg-brand-700 transition-transform transform active:scale-95"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-brand-600 font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
