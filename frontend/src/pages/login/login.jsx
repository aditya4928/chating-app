import React from "react";

const Login = () => {
  return (
    <div className="h-screen w-screen relative">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-6 rounded-lg shadow-md bg-white/20 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-center text-white mb-4">
          {" "}
          Login <span className="text-blue-400">To start chat</span>{" "}
        </h1>

        <form>
          <div className="mb-3">
            <label className="block mb-1 text-white-700">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-400 p-2 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-white-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-400 p-2 rounded"
            />
          </div>

          <div className="mb-3 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Don't have an account?
            </a>
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
