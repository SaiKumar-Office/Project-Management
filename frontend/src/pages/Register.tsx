// src/pages/Register.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/customHooks";
import { signupUser } from "../redux/Login/loginUserSlice"; // removed loadCurrentUser
import { fetchMe } from "../redux/User/userSlice";          // added fetchMe
import Loader from "../components/Loader";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.loginUser);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Redirect if already logged in
  useEffect(() => {
    if (auth.token && !currentUser) {
      dispatch(fetchMe(auth.token));  // ⬅ Load current user using token
    }

    if (currentUser) {
      navigate("/dashboard");
    }
  }, [auth.token, currentUser, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(signupUser({ name, email, password }));

    if (res.type === "auth/signup/fulfilled") {
      navigate("/"); // go to login page after successful signup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      {auth.loading && <Loader />}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-soft p-8">
        <h2 className="text-2xl font-semibold text-brand-700 mb-6">Create account</h2>

        {auth.error && <div className="text-red-500 mb-4">{auth.error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
            Create account
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-brand-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
