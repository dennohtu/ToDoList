import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SuccessToast, ErrorToast, LoadingToast, ToasterContainer } from "../Toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    LoadingToast(true); 
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const result = response.data.data;
        localStorage.setItem('token', result.token);
        SuccessToast("Login successful!");
        navigate("/dashboard");
      } else {
        // setError("Invalid ")
        ErrorToast("Invalid email or password.");
      }
    } catch (err) {
      // Handle different error statuses
      if (err.response && err.response.status === 401) {
        ErrorToast("Invalid email or password.");
      } else {
        ErrorToast("Login failed. Please try again.");
      }
    } finally {
      LoadingToast(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              type="submit"
              value="Login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            />
            <div className="flex justify-center items-center mt-4">
              <p className="text-gray-700 text-sm">
                Do you have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <ToasterContainer/>
    </div>
  );
};

export default Login;
