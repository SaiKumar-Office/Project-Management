/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { register } from "../features/authSlice";
import Loader from "../components/Loader";
import Button from "../components/Button";

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: { auth: any; }) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1A3636] text-white">
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#223939] p-8 rounded-2xl shadow-xl w-96"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded bg-[#1A3636] border border-gray-600 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded bg-[#1A3636] border border-gray-600 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-[#1A3636] border border-gray-600 text-white"
          />

          <Button label="Register" type="submit" />
          {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
