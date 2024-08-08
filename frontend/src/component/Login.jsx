import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

 
const Login = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input 
                type="text" 
                name="username" 
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
      </div>
    );
};
 
export default Login;
